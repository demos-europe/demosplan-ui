pipeline {
    agent {label 'docker'}
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install -g yarn'
                sh 'yarn install'
            }
        }

        stage('Run Tests') {
            steps {

                sh 'yarn test'
            }
        }
    }
}