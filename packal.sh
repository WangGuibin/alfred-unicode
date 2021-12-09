#! /bin/bash
CurrentDirName=$(basename `pwd`)
version='1.0.0'
if [[ -n $1 ]]; 
then
version=$1 
fi 

workflowName="${CurrentDirName}-v${version}"
oldName=$(/usr/libexec/PlistBuddy -c "print :name " info.plist)
if [[ -n "$oldName" ]]
then
/usr/libexec/PlistBuddy -c "set :name '${workflowName}' " info.plist
else
/usr/libexec/PlistBuddy -c 'add :name string ${workflowName}' info.plist
fi

oldVersion=$(/usr/libexec/PlistBuddy -c "print :version '${version}' " info.plist)
if [[ -n "$oldVersion" ]]
then
/usr/libexec/PlistBuddy -c "set :version '${version}' " info.plist
else
/usr/libexec/PlistBuddy -c "add :version string '${version}'" info.plist
fi

echo "\033[32;49;1m ================== 打包准备就绪 =====================\033[39;49;0m"
echo "\033[32;49;1mbundleid:\033[39;49;0m"
/usr/libexec/PlistBuddy -c "print bundleid" info.plist
echo "\033[32;49;1mname:\033[39;49;0m"
/usr/libexec/PlistBuddy -c "print name" info.plist
echo "\033[32;49;1mversion:\033[39;49;0m"
/usr/libexec/PlistBuddy -c "print version" info.plist

echo "\033[32;49;1m ================== 开始打包 =====================\033[39;49;0m"
startTime=`date +%s`
# 把需要打包的文件装到临时目录
mkdir temp
cp -R -f icon.png temp
cp -R -f info.plist temp
cp -R -f run.js temp
cp -R -f package.json temp
cp -R -f package-lock.json temp
cp -R -f node_modules temp
cd temp
zip -qryX ../$workflowName.alfredworkflow  *
cd ..
#打完包之后删除临时目录
rm -rf temp
endTime=`date +%s`
echo "\033[32;49;1m ================== 打包成功!!🔥 =====================\033[39;49;0m"
#计算打包耗时:
speadTime=`expr $endTime - $startTime`
echo "\033[1;3;32m打包耗时: ${speadTime} 秒 \033[m"
open ./
