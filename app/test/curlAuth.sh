
# AuthApi

echo "AuthApi"
echo " Wrong password"

curl -i \
  --header "Content-type: application/json" \
  --request POST \
  --data '{"email": "admin@bayliss-it.com.au", "password": "wrong" }' \
  http://localhost:3000/authentication


echo " Valid login"

curl -i \
  --header "Content-type: application/json" \
  --request POST \
  --data '{"email": "admin@bayliss-it.com.au", "password": "secret" }' \
  http://localhost:3000/authentication

echo


echo "Done"