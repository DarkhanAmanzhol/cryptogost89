echo -e "\nDOCKER IS BUILDING\n"
docker build . -t gost89

echo -e "\nDOCKER IS RUNNING ON PORT 5000, HOST 127.0.0.1\n"
docker run -it -p 5000:5000 --rm gost89