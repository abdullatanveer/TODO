pipeline {
    agent any
    stages {
        stage('Preparation') {
            steps {
                cleanWs()
           }
    }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
         stage('Run Docker Compose') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml pull' // Pull the images from Docker Hub
                    sh 'docker-compose -f docker-compose.yml up -d  '
                }
            }
        }
    }
}
