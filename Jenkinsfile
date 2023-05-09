pipeline {
    environment {
        registry = "reddi16181/demonodejs"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }
    
    agent any
    
    tools {nodejs "node19"}
    
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: '436d1749-e687-48b9-bde0-66f87d2d3eaa', url: 'https://github.com/reddi16181/node-app.git']])
            }
        }

        stage('Build') {
            steps {
                echo 'node Build proect'
                sh 'npm install'
                sh 'npm start'
            }
        }
        
        stage('Test') {
            steps {
                echo 'node test project'
                sh 'npm test'
            }
        }
        
        stage('Cleaning Up') {
            steps {
                script {
                    def previousBuildNumber
                    println "Before Previous Build Number: ${previousBuildNumber}"
                    // Retrieve current build number
                    def currentBuildNumber = currentBuild.number
                    def currentBuildNumber1 = 48
                    println "-------->> Current Build Number: ${currentBuildNumber}"
                    println "ONE ---------->> Current Build Number: ${currentBuildNumber1}"
                    
                    // Calculate previous build number
                    if (currentBuildNumber > 1) {
                        previousBuildNumber = currentBuildNumber - 1
                    } else {
                        previousBuildNumber = -1 // Set a default value for the first build
                    }
                    
                    // Print the previous build number
                    println "Previous Build Number: ${previousBuildNumber}"
                }
                // sh 'docker rmi --force $registry:$previousBuildNumber'
            }
        }
        
        stage('Building Docker Image') {
            steps {
                echo 'docker image build for node project'
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
        
        stage('docker run a continer') {
            steps {
                echo 'continer run commend'
                sh 'docker rm -f $(docker ps -a -q)'
                sh 'docker run -it -p 3000:3000 -d $registry:$BUILD_NUMBER'
            }
        }
        
        stage('Scanning') {
            steps {
                echo 'scanning image you continer'
            }
        }
        
        stage('Pushing') {
            steps {
                echo 'pushing docker image into docker hub'
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Remove Unused docker image') {
            steps{
                echo "cleaning"
                //sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }
    }
}
