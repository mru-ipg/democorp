pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git branch: 'main', url: 'https://github.com/yourusername/yourrepository.git'
            }
        }

        stage('Build') {
            steps {
                // Add build steps (for example, a Maven build)
                sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                // Run tests here
                sh 'mvn test'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy steps (for example, deploying to a server)
                echo 'Deploying to the server...'
            }
        }
    }
}
