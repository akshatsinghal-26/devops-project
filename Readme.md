# 🚀 End-to-End CI/CD Pipeline using Jenkins, Docker & Kubernetes (Kind)

## 📌 Project Overview

This project demonstrates a complete **DevOps CI/CD pipeline** that automates the process of building, packaging, and deploying an application using Jenkins, Docker, and Kubernetes.

The pipeline is fully automated and triggered via GitHub webhooks, ensuring continuous integration and continuous deployment with minimal manual intervention.

---

## 🧱 Architecture

```text
Developer → GitHub → Jenkins → Docker → Docker Hub → Kubernetes (Kind)
```

---

## ⚙️ Tech Stack

* Jenkins (CI/CD Automation)
* Docker (Containerization)
* Kubernetes (Kind - Local Cluster)
* GitHub (Source Code Management)
* Docker Hub (Image Registry)
* Linux & Shell Scripting

---

## 🔄 CI/CD Pipeline Flow

1. Developer pushes code to GitHub
2. GitHub webhook triggers Jenkins pipeline
3. Jenkins pulls the latest code
4. Docker image is built from source code
5. Image is pushed to Docker Hub
6. Kubernetes deployment is updated using rolling update strategy
7. Deployment status is verified using `kubectl rollout status`

---

## 📦 Project Structure

```text
.
├── Jenkinsfile
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── app/
│   ├── Dockerfile
│   └── source code
├── jenkins-setup.md
└── README.md
```

---

## 🧾 Jenkins Pipeline (Key Stages)

* **Clone Code** – Fetch latest code from GitHub
* **Build Docker Image** – Build container image
* **Push to Docker Hub** – Securely push image
* **Deploy to Kubernetes** – Update deployment using `kubectl set image`

---

## 🔐 Credentials Management

Sensitive information such as Docker Hub credentials is securely managed using Jenkins Credentials Store, avoiding hardcoding in pipeline scripts.

---

## 🔁 Deployment Strategy

* Rolling updates implemented using:

```bash
kubectl set image deployment/<deployment-name> <container>=<image>
```

* Deployment verification:

```bash
kubectl rollout status deployment/<deployment-name>
```

Ensures **zero downtime deployments**

---

## 🌐 Webhook Integration

GitHub webhook is configured to trigger Jenkins pipeline automatically on every code push.

---

## 🧪 Verification Commands

```bash
kubectl get pods
kubectl get svc
```

---

## 💡 Key Features

* Fully automated CI/CD pipeline
* Dockerized application
* Kubernetes deployment with rolling updates
* Secure credential management
* Webhook-based trigger (event-driven CI/CD)
* Reproducible and scalable setup

---

## 📈 Future Improvements

* Deploy on AWS EKS instead of Kind
* Use Terraform for infrastructure provisioning
* Implement monitoring (Prometheus & Grafana)
* Add Canary/Blue-Green deployment strategy

---

## 🧠 Learnings

* Hands-on experience with Jenkins pipelines
* Integration of Docker with CI/CD workflows
* Kubernetes deployment automation
* Real-world DevOps workflow implementation

---

## 👨‍💻 Author

**Akshat Singhal**

---

## ⭐ Conclusion

This project showcases a real-world implementation of CI/CD using modern DevOps tools and practices, demonstrating automation, scalability, and reliability in software delivery.

---
