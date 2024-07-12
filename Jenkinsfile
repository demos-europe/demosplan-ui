pipeline {
    agent {label 'docker'}
    options {
        timeout(time: 10, unit: 'MINUTES')
    }
    stages {
        stage('Install Dependencies') {
            steps {
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