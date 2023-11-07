# TerminalUI
UI to interface with the terminal on the machine that the app is being hosted on. Made for interface with Replit's shell from anywhere.

Since I couldn't figure out how to make subprocess commands always run in the same environment, before running a command, I cd into the global cd directory that was previously saved and after running the command, I save the current directory to the global cd variable using `pwd`. This way it mimicks being in the same environment by just changing the directory before running commands. 

The program fetches the output of a terminal command using the route `/command`, the output of this request is the `output`, `path`, and `rc`. Output is the actually output of the command, path is the directory after the execution of the command and rc is the whether or not there was an error when running the command. 

> The program has essentially full control over the shell so you can delete anything you want if you have the correct permissions on the hosted machine.

The `interface.py` file was made so that I can place in in different Replit projects so that I could use the terminal interface to interact with them. The file contains a function `setup_interface` that requires a `app` parameter to be passed in which is just a `Flask()` object. After running the `setup_interface` command, you can now run commands into your programs shell using `/command`

> ![image](https://github.com/wa1ker38552/TerminalUI/assets/100868154/6b3c6404-0da2-46f2-926a-d96784b10707)
