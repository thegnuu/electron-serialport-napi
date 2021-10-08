CURRENT_DIR="$(cd "$(dirname "$0")" && pwd)"

# clone or pull test repo
if [ ! -d "./serialport" ]
then
  echo "Clone serialport repo" 
  git clone https://github.com/GazHank/node-serialport.git serialport
  git checkout napi
else
  echo "Pull serialport repo" 
  cd serialport
  git pull
fi

cd $CURRENT_DIR

# install deps
cd serialport
yarn

# link serialport
cd $CURRENT_DIR
cd serialport/packages/serialport
yarn link

# link serialport/bindings
cd $CURRENT_DIR
cd serialport/packages/bindings
yarn link

# link here
cd $CURRENT_DIR
yarn link serialport
yarn link @serialport/bindings

# BASEDIR=$(dirname $0)
# ABSPATH=$(readlink -f $0)
# ABSDIR=$(dirname $ABSPATH)

echo "CURDIR is $CURRENT_DIR"
# echo "BASEDIR is $BASEDIR"
# echo "ABSPATH is $ABSPATH"
# echo "ABSDIR is $ABSDIR"