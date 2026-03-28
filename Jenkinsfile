pipeline {
    agent any

    environment {
        IMAGE_NAME = "akshatdhub26/my-node-app"
    }

    stages {
        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/akshatsinghal-26/devops-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push $IMAGE_NAME
                    '''
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl set image deployment/my-node-deployment \
                my-node-container=akshatdhub26/my-node-app:latest
        
                kubectl rollout status deployment/my-node-deployment
                '''
            }
        }
    }
}
