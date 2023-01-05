set -e
set -x
npm run build
scp -r dist project3-AWS:/home/ubuntu/project3