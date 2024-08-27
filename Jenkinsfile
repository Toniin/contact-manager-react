pipeline {
    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub_credentials'
        NAME = "toniin/contact-manager-react"
        VERSION = "${env.BUILD_ID}.0.0"
        GIT_REPO = 'https://github.com/Toniin/react-jenkins.git'
    }

    agent any

    stages {
        stage('Cloning our Git') {
            steps {
                git branch: 'main',
                    url: GIT_REPO
            }
        }

        stage('Building our image') {
            steps{
                sh "docker build -t ${NAME} ."
            }
        }

//         stage('Deploy our image') {
//             steps{
//                 script {
//                     docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
//                         sh "docker tag ${NAME} ${NAME}:${VERSION}"
//
//                         sh 'docker push ${NAME}:latest'
//                         sh 'docker push ${NAME}:${VERSION}'
//                     }
//                 }
//             }
//         }

//         stage('Cleaning up') {
//             steps{
//                 sh "docker rmi ${NAME}:latest"
//                 sh "docker rmi ${NAME}:${VERSION}"
//             }
//         }
    }
}