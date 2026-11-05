# 🚀 Jenkins CI/CD Pipeline Setup Guide

This guide walks you through setting up Jenkins to run the **CI** (`Jenkinsfile.ci`) and **CD** (`Jenkinsfile.cd`) pipelines for the Gen-Z Clothing Store.

---

## 1. 🔌 Jenkins Plugins Required

Ensure the following plugins are installed in Jenkins:
Go to **Manage Jenkins** ➔ **Plugins** ➔ **Available plugins**:

1. **Docker Pipeline** (`docker-workflow`)
2. **Credentials Binding** (`credentials-binding`)
3. **Pipeline** (`workflow-aggregator`)
4. **Git** (`git`)
5. *(Optional)* **NodeJS** (`nodejs`) if building directly on the host without Docker containers.

---

## 2. 🔐 Credentials Required (For Docker Hub Push in CD)

To allow the CD pipeline to push your images to Docker Hub:

1. In Jenkins, go to **Manage Jenkins** ➔ **Credentials** ➔ **System** ➔ **Global credentials (unrestricted)**.
2. Click **+ Add Credentials**:
   * **Kind**: `Username with password`
   * **Scope**: `Global`
   * **Username**: Your Docker Hub username (e.g. `yourname`)
   * **Password**: Your Docker Hub password or Personal Access Token (PAT recommended)
   * **ID**: `dockerhub-credentials` *(must match exactly)*
   * **Description**: `Docker Hub Login Credentials`
3. Click **Create**.

---

## 3. 🛠️ Permissions on Jenkins Server

The `jenkins` user must have permission to execute Docker commands:

On your Linux/Jenkins host:
```bash
# Add the jenkins user to the docker group
sudo usermod -aG docker jenkins

# Restart Jenkins service to apply group changes
sudo systemctl restart jenkins
```

*(On Windows, ensure Docker Desktop is running and Jenkins service has access to the Docker daemon).*

---

## 4. 📁 Pipeline Files

| File | Type | What It Does |
| :--- | :--- | :--- |
| [`Jenkinsfile.ci`](./Jenkinsfile.ci) | **CI (Continuous Integration)** | Pulls code, runs backend unit tests (`npm test`), validates frontend build (`vite build`), and builds local Docker images. |
| [`Jenkinsfile.cd`](./Jenkinsfile.cd) | **CD (Continuous Delivery)** | Runs tests, builds Docker images, logs into Docker Hub using credentials, pushes images with build numbers & `latest` tags, and deploys using `docker compose`. |

---

## 5. ⚙️ Creating the Pipeline in Jenkins

1. Go to Jenkins Dashboard ➔ **New Item**.
2. Enter item name (e.g., `genz-clothing-store-ci`).
3. Select **Pipeline** and click **OK**.
4. In the configuration:
   * Scroll down to the **Pipeline** section.
   * Definition: **Pipeline script from SCM**.
   * SCM: **Git**.
   * Repository URL: *Your Git repository URL*.
   * Script Path: 
     * For CI: `cicd/Jenkinsfile.ci`
     * For CD: `cicd/Jenkinsfile.cd`
5. Click **Save** and then **Build Now**.
