docker build . -t registry.cn-hangzhou.aliyuncs.com/fadinglight/bill-react:dev

docker push registry.cn-hangzhou.aliyuncs.com/fadinglight/bill-react:dev

ssh aliyun "cd /root/docker/bill-sys/;
            docker compose down; 
            docker pull registry.cn-hangzhou.aliyuncs.com/fadinglight/bill-go:dev; 
            docker compose up -d"
