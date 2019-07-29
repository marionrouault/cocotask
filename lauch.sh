echo "Launching the experiment"
docker run \
	     --detach \
	     --tty \
	     -p 8086:80 \
	     -p 3386:3306 \
	     --name cocotask \
	     -v "$PWD:/opt/lampp/htdocs" \
			cswl/xampp
