# Doctor's Office Appointment System

This repository contains the code and Kubernetes deployment configuration for a Doctor's Office Appointment System. The application is built using the MERN stack (MongoDB, Express.js, React, Node.js) and is deployed on Kubernetes.

## Application Overview

The Doctor's Office Appointment System consists of three main components:

1. Frontend (React)
2. Backend (Node.js/Express)
3. Database (MongoDB)

For a detailed overview of the application components and architecture, please refer to the [Application Overview](application_overview.md) document.

## Kubernetes Deployment

The application is deployed on Kubernetes using the following resources:

- Frontend Deployment and Service
- Backend Deployment and Service
- MongoDB Deployment and Service
- Ingress for routing external traffic

For a comprehensive analysis of the Kubernetes deployment, please see the [Kubernetes Analysis](kubernetes_analysis.md) document.

## Getting Started

To deploy the application on a Kubernetes cluster:

1. Ensure you have `kubectl` installed and configured to connect to your cluster.
2. Apply the Kubernetes configuration files:

   ```
   kubectl apply -f kubernetes/
   ```

3. Access the application using the Ingress IP or hostname.

## Documentation

- [Application Overview](application_overview.md)
- [Code Analysis](code_analysis.md)
- [Kubernetes Analysis](kubernetes_analysis.md)
- [Kubernetes Deployment Summary](kubernetes_deployment_summary.md)

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the The Fight Club License - see the [LICENSE](https://github.com/benlk/misc-licenses/blob/master/fight-club-license.md) file for details.