## Building Image and pushing it to AWS
```bash
cd exporters
docker build -t metrics .
docker tag metrics:latest 197001192061.dkr.ecr.us-east-1.amazonaws.com/metrics:latest
```