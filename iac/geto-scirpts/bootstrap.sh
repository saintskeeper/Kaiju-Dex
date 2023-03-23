gcloud container clusters create my-affordable-cluster \
  --project kaiju-dex  \
  --region us-central1 \
  --node-locations us-central1-a,us-central1-b,us-central1-c \
  --num-nodes 1 \
  --machine-type e2-small \
  --enable-autoscaling --min-nodes 1 --max-nodes 3
