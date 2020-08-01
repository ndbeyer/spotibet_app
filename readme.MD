## General

### add xcode Builds

https://shockoe.com/ideas/development/how-to-setup-configurations-and-schemes-in-xcode/

## Android

### TouchableOpacity bug

https://github.com/facebook/react-native/issues/27008

### No Network

1. Set your environment path to the emulator path

Make sure you have your environmental path set to the below.

// MacOS
~/Library/Android/sdk/emulator// Windows
C:\Users\%Username%\AppData\Local\Android\sdk\emulator

In Mac terminal, you could the following

export PATH=”~/Library/Android/sdk/emulator:\${PATH}”

2. Test you have access to the right emulator

Type which emulator in your terminal, you should get the below

/Users/%user.name%/Library/Android/sdk/emulator/emulator

    It is very important to ensure it is in sdk/emulator/emulator and not sdk/tools/emulator as that’s the problem on my machine that get me so confused why it’s not working.

3. Find your emulators available

Now just type emulator -list-avds and you’ll get a list like below (e.g.)

Nexus*5X_API_21
Nexus_5X_API_24_no_Google_API*
Nexus_5X_API_25
Nexus_5X_API_26_2
Nexus_5X_API_28
Nexus_6P_API_22
Nexus_6P_API_24
Nexus_6_API_23
Nexus_6_API_24
Pixel_2_API_28
Pixel_API_24
Pixel_API_25
Pixel_XL_API_26

4. Run your emulator with dns_server set to 8.8.8.8

Now run your emulator using the below command

emulator @{YourEmulator} -dns-server 8.8.8.8

That’s it! Try access Google from the emulator, and it should be all good 🤞.
