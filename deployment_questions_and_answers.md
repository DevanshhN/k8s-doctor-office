# Deployment Questions and Answers

This document addresses specific questions about the Doctor's Office Appointment System's code and its deployment on Kubernetes.

## 1. How does the backend connect to MongoDB?

The backend connects to MongoDB using the Mongoose library. The connection string is likely defined in an environment variable or configuration file. In the Kubernetes deployment, you should ensure that the backend deployment has the correct MongoDB service name in its connection string, which would be `mongodb://mongo:27017/appointments`.

## 2. How are environment variables managed in the Kubernetes deployment?

Currently, environment variables are not explicitly defined in the Kubernetes deployment files. To properly manage environment variables:

- Create a ConfigMap for non-sensitive configuration:
  ```yaml
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: app-config
  data:
    MONGODB_URI: "mongodb://mongo:27017/appointments"
    API_URL: "http://backend-service:3000/api"
  ```

- Use Secrets for sensitive information:
  ```yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: app-secrets
  type: Opaque
  data:
    DB_USERNAME: base64_encoded_username
    DB_PASSWORD: base64_encoded_password
  ```

- Reference these in your deployment files:
  ```yaml
  env:
    - name: MONGODB_URI
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: MONGODB_URI
    - name: DB_USERNAME
      valueFrom:
        secretKeyRef:
          name: app-secrets
          key: DB_USERNAME
  ```

## 3. How is CORS (Cross-Origin Resource Sharing) handled?

CORS is enabled in the Ingress configuration using the annotation `nginx.ingress.kubernetes.io/enable-cors: "true"`. This allows the frontend to make requests to the backend API when they are hosted on different domains.

In the backend code, you should also ensure that CORS is properly configured, typically using a middleware like `cors` in Express.js.

## 4. How can we ensure zero-downtime deployments?

To achieve zero-downtime deployments:

1. Use rolling update strategy in your deployments:
   ```yaml
   spec:
     strategy:
       type: RollingUpdate
       rollingUpdate:
         maxUnavailable: 25%
         maxSurge: 25%
   ```

2. Implement readiness and liveness probes to ensure traffic is only sent to healthy pods.

3. Use multiple replicas for your frontend and backend deployments.

## 5. How can we implement auto-scaling for the application?

Implement Horizontal Pod Autoscaler (HPA) for your frontend and backend deployments:

```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: frontend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: frontend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      targetAverageUtilization: 50
```

## 6. How can we implement backup and restore procedures for MongoDB?

1. Use a StatefulSet instead of a Deployment for MongoDB to ensure stable network identifiers and persistent storage.
2. Implement a CronJob to perform regular backups:
   ```yaml
   apiVersion: batch/v1beta1
   kind: CronJob
   metadata:
     name: mongo-backup
   spec:
     schedule: "0 1 * * *"
     jobTemplate:
       spec:
         template:
           spec:
             containers:
             - name: mongo-backup
               image: mongo
               command: ["/bin/sh", "-c", "mongodump --uri mongodb://mongo:27017/appointments --archive=/backup/mongo-backup-$(date +%Y-%m-%d).gz --gzip"]
               volumeMounts:
               - name: backup
                 mountPath: /backup
             restartPolicy: OnFailure
             volumes:
             - name: backup
               persistentVolumeClaim:
                 claimName: mongo-backup-pvc
   ```

3. Implement a restore procedure using a similar Job when needed.

## 7. How can we implement logging and monitoring?

1. Deploy the ELK (Elasticsearch, Logstash, Kibana) stack or use a managed logging solution.
2. Implement Prometheus and Grafana for monitoring:
   - Deploy Prometheus Operator
   - Create ServiceMonitor resources for your services
   - Configure Grafana dashboards

3. Modify your application to output logs in a structured format (e.g., JSON) for better parsing.

## 8. How can we implement SSL/TLS for secure communications?

1. Use cert-manager to automatically provision and manage TLS certificates.
2. Update your Ingress to use TLS:
   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     annotations:
       kubernetes.io/ingress.class: nginx
       cert-manager.io/cluster-issuer: "letsencrypt-prod"
   spec:
     tls:
     - hosts:
       - yourdomain.com
       secretName: tls-secret
     rules:
     - host: yourdomain.com
       http:
         paths:
         - path: /
           pathType: Prefix
           backend:
             service:
               name: frontend-service
               port: 
                 number: 80
   ```

These questions and answers provide more detailed insights into the deployment process and address common concerns when deploying a web application on Kubernetes. They complement the existing documentation and should help in understanding and improving the deployment of the Doctor's Office Appointment System.