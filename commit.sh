git status &&
echo -n "Do you want push to github? (y/n)"
read yesno < /dev/tty

if [ "$yesno" = "y" ] || [ "$yesno" = "" ];then
   echo "yes"
else
   echo "no"
   exit 8
fi
git add . &&
echo -n "Please input your commit message:"
read commit < /dev/tty
git commit -m "$commit" &&
git push