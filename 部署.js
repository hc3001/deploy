/*
部署项目

一：前期准备
   1、新建仓库：在coding/github 新建仓库，选择coding 因为其带有私有仓库，新建时可以添加gitignore忽略文件。
   2、GitHub desktop 上传项目代码到coding，操作： 首先点击clone repository 克隆仓库到本地，输入coding中新建项目的url：
   https://git.coding.net/huangcheng3001/myproject.git 点击上传
   
   

二：必备知识
1、windows 下载cmder运行命令。Mac 可直接在terminal输入命令。
2、腾讯云第一次默认为ubuntu用户，输入公网ip：ssh ubuntu@118.89.42.219，输入密码（密码不显示）登陆
3、本地生成ssh公钥和私有,输入命令： ssh-keygen -C <mykey> （mykey 为任意英文名称）
    id_rsa 是私钥 自己保存 不要给别人看
    id_rsa.pub 是公钥, 是要到处使用的
4、filezilla登陆服务器，有用户密码登陆和ssh 添加私钥登陆二种。有配置私钥可以直接免密登陆。



三、要求用 root 用户免密登录, 登录之后默认在 /root 目录

1、修改为root 用户登陆，默认为ubuntu: (修改ssh权限)
sudo chown -R ubuntu:ubuntu /home/ubuntu
chmod -R g-rwx /home/ubuntu/.ssh/
chmod -R o-rwx /home/ubuntu/.ssh/
2、用filezilla编辑 .ssh/authorized_keys文件，输入之前本地生成的公钥(ubuntu免密登陆)
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1t8WZGzlSzyMYZWKv/qN/wbePkDHhrAR65gsSowXMTqF31zLzgo/PK/v8Pwr+mEwZuVHZlCFaeO4ndNtUAsNHX/KAfQr/RWrBkLMRE3U1PvzZtS7FQ2doHlGb/0OU2ssYjpcbJsCZ/eO+M2AaJCPVezwfr8ABw/5BjdlMqQt5iZPBjjWevvdpEl8zP2Tttlwk5PIXcoRoe3jaf1OBfzwHDuTHOpBRKJNArh31tQ9/1UPK9fg8m3eUnlKtaKcsClWsAMNHuOpIaoDQxVY+VQ67UVXxsywy4h0KycOXLWb5IFNFLdsCBGKwKrvT6MFI9F8D05pUrqeXeQBX3j8yJR4X hcc
保存上传（此时可以用ubuntu免密登陆）

3、root 免密登陆
sudo mkdir /root/.ssh
sudo cp /home/ubuntu/.ssh/authorized_keys  /root/.ssh/authorized_keys
ssh root@118.89.42.219

4、禁止密码登陆
1、在filezilla中找到/etc/ssh 的sshd_config文件，打开编辑。
把  HostbasedAuthentication 设置为 no，保存上传



四、软件安装(验证是否安装上 软件名 --version 或 软件名 --v)
1、安装 git nginx
apt-get install git nginx

2、安装 zsh和wget
sudo apt-get install zsh
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh

3、安装node.js
注意：ubuntu 的软件仓库中的 nodejs 更新很慢, 几乎可以认为不可用,
所以我们从 nodeSource 仓库中安装新款 nodejs
配置 nodeSource 仓库
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -

配置之后就可以安装最新的 nodejs
sudo apt-get install -y nodejs

4、安装 yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

5、上传代码到服务器
注意你的项目名称应该为 node10_2
里面包含板书 node10_2 这个目录里面的所有文件
clone 项目

git clone <这里填写你的项目的git地址>（有http和ssh二种，如果要免密就要选ssh仓库地址）
clone 之后会在 /root 下增加一个目录 node10_2

把 node10_2 移动到 /var/www 目录下
mv node10_2 /var/www/node10_2

cd 到bbs文件
安装依赖
yarn install

配置 nginx
ln -s /var/www/community（项目名称）/community.nginx /etc/nginx/sites-enabled/community（项目名称）
移除默认的配置文件
mv /etc/nginx/sites-enabled/default /tmp
mv /etc/nginx/sites-available/default /tmp

五、免密pull 代码到服务器

1、在服务器中生成公钥，ssh-keygen -C server .
2、查看公钥（在默认目录中）， cat .ssh/id_rsa.pub
3、coding项目中新建公钥，（可选推送权限）

六、启动项目
1、重启 nginx
service nginx restart

安装pm2
yarn global add pm2
(pm2 日志目录：~/.pm2/logs)
运行程序
yarn run start
(node app.js &)

2、更新代码
新建一个deploy.sh 文件
git pull
service nginx restart

在服务器中 sh deploy.sh 直接执行就可更新




*/
