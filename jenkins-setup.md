# Jenkins Setup Guide for CI/CD Pipeline

## 📌 Overview

This document explains how to set up Jenkins and run the CI/CD pipeline for this project.

The pipeline performs:

* Code checkout from GitHub
* Docker image build
* Push image to Docker Hub
* Deploy to Kubernetes (Kind cluster)

---

## 🚀 Prerequisites

Ensure the following are installed on your system:

* Docker
* Kubernetes cluster (Kind)
* kubectl
* Git

---

## 🧱 Step 1: Run Jenkins using Docker

```bash
docker run -d \
  --name jenkins \
  --network host \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

---

## 🔐 Step 2: Unlock Jenkins

Run the following command to get the admin password:

```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Open Jenkins in browser:

```
http://localhost:8080
```

Paste the password and proceed.

---

## ⚙️ Step 3: Install Plugins

Select:
**Install Suggested Plugins**

Ensure the following plugins are available:

* Pipeline
* Git
* Docker Pipeline

---

## 👤 Step 4: Create Admin User

Create a username and password for Jenkins login.

---

## 🔑 Step 5: Configure Credentials

Go to:
**Manage Jenkins → Credentials → Global → Add Credentials**

Add Docker Hub credentials:

* Kind: Username with password
* ID: `dockerhub-cred`
* Username: Your Docker Hub username
* Password: Your Docker Hub password

---

## 🔗 Step 6: Connect Kubernetes (Kind)

Copy kubeconfig into Jenkins container:

```bash
docker cp ~/.kube jenkins:/root/
```

Verify:

```bash
docker exec -it jenkins kubectl get nodes
```

---

## 📦 Step 7: Create Jenkins Pipeline Job

1. Click **New Item**
2. Enter name (e.g., `devops-pipeline`)
3. Select **Pipeline**
4. Click OK

---

## 🧾 Step 8: Configure Pipeline

* Scroll to **Pipeline**
* Select: **Pipeline script from SCM**

Fill details:

* SCM: Git
* Repository URL: `<your-repo-url>`
* Branch: `main`
* Script Path: `Jenkinsfile`

Save the job.

---

## 🔄 Step 9: Run Pipeline

Click:
**Build Now**

Jenkins will:

* Clone repository
* Build Docker image
* Push to Docker Hub
* Deploy to Kubernetes

---

## 🌐 Step 10: Enable Webhook (Optional)

To automate pipeline:

1. Run ngrok:

```bash
ngrok http 8080
```

2. Copy HTTPS URL

3. In GitHub:

* Go to Settings → Webhooks
* Add:

```
https://<ngrok-url>/github-webhook/
```

4. Select:

* Content type: application/json
* Trigger: Push events

---

## 🧪 Verify Deployment

Check Kubernetes resources:

```bash
kubectl get pods
kubectl get svc
```

---

## 📊 Pipeline Flow

```
GitHub Push → Jenkins Trigger → Build Docker Image → Push to Docker Hub → Deploy to Kubernetes
```

---

## 🧠 Notes

* Ensure Docker daemon is accessible to Jenkins
* Ensure correct image name is used in Kubernetes manifests
* Use `kubectl rollout status` to verify deployment

---

## 🏁 Conclusion

This setup enables a fully automated CI/CD pipeline with Jenkins, Docker, and Kubernetes, ensuring fast and reliable deployments.

---

