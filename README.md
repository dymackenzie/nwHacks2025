<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />

<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/user-attachments/assets/33a6adb0-1087-4e1a-8623-3461a336eac1" alt="Logo" width="300" height="300">
  </a>
  
  <h3 align="center">Latte Less</h3>

  <p align="center">
    End Caffeine Addiction!
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<img src="https://github.com/user-attachments/assets/6a77e997-651d-4e1f-b310-a96959738041" width="600">
<img src="https://github.com/user-attachments/assets/ac7a9269-ef51-4d2d-adc4-f218037bc2dc" width="600">

Latte Less tracks how much coffee you're drinking and only lets you start your coffee maker when you're below your limit, as well as the time being early enough in the day. Your dashboard also shows you how much coffee you've been drinking, and the cost associated with it. It tracks coffee from sources outside your coffee maker by sending a push notification once per day, letting you quickly input the number of cups of coffee you had outside your home, and reminding you to check the dashboard.

#### Features

* Coffee Intake Analytics: A page featuring history, trends, and money spent on coffee.
* Coffee Machine Restriction: Connected to hardware that can control your coffee machine, all through the app!
* Notifications: A daily notification that reminds users to update coffee stats.
* Light Mode/Dark Mode: Allows for a switch of color palettes depending on the user's preference.

#### Vision

Do you ever feel like you ingest too much caffeine? Spend too much money on coffee? What if you could hold yourself accountable by viewing the total amount of coffee drank and money spent? Better, what if you could physically limit yourself to a reasonable level of intake, by enabling your coffee machine at certain hours only?

#### How we built it

We used react-native with Expo to create a mobile app, which communicates with a web server running on node.js. The web server sends a command to the Arduino to power the servo, switching on your coffee maker. To store user data, the app communicates directly with Firestore.

#### Challenges we ran into

This was both of our first times doing any hardware, so there were some challenges there. We wanted to use an esp32 instead of the Arduino, meaning that the web server could be independent of a laptop. However, when I plugged in the chip it started melting, so we abandoned that idea.

Getting the stepper motor to run for the first time took a frustratingly long time. Eventually, we realized there was a tiny switch on the driver board that was not enabled.

#### What we learned

Hackathons aren't just about coding—they’re also a crash course in hardware readiness and networking. One key takeaway is the importance of hardware adaptability. If your laptop lacks USB ports, a USB-C adapter is essential to connect peripherals or devices, ensuring smooth collaboration and troubleshooting.

Additionally, a better understanding of networking—both wired and wireless—can save valuable time during the event. Configuring connections between devices, managing bandwidth, and debugging network issues are crucial skills when working with IoT devices, servers, or multi-device systems.

### Built With

* React-Native
* Expo
* Firebase (Authentication, Firestore)
* Typescript
* Arduino
