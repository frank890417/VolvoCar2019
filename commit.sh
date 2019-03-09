echo "Enter Commit message:"
read msg
echo "Push and Deploy (y/n)? "
read answer

cd frontend_spa
npm run build
cd ..

sh cache.sh
git add .
git commit -m "$msg"
echo ""
echo "Git Commit complete!"
echo ""

if echo "$answer" | grep -iq "^y" ;then
    sh deploy.sh
else
    echo 'Cancel commit'
fi

