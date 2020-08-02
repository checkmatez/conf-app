# Example application for real-time chat on conference talks

## Deploying on Kubernetes cluster

1. Optionally, create new namespace: `kubectl create ns conf-app`.
2. Create secrets:

- `kubectl create secret generic postgres --from-literal=POSTGRES_PASSWORD=<your-password>`
- `kubectl create secret generic auth-db --from-literal=DB_USERNAME=postgres --from-literal DB_PASSWORD=<your-password>`
- `kubectl create secret generic chat-db --from-literal=DB_USERNAME=postgres --from-literal DB_PASSWORD=<your-password>`
- `kubectl create secret generic auth-admin --from-literal=ADMIN_USERNAME=<admin-username> --from-literal=ADMIN_PASSWORD=<admin-password>`
- `kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=<your-secret>`
