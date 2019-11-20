Riffy Vote
==========

Simple real-time voting web application with take an avantage of Firebase Authentication and Firebase Firestore

Requirements
------------

- Node LTS

Installation & Set-up
---------------------

1. Create a firebase project that you wish to deploy into.

2. Create some initalize data in Firestore with following data

| Document Path               | Value   |
| --------------------------- | ------- |
| `/system/admins/uids`       | `[]`    |
| `/system/admins/votes/open` | `false` |

3. Copy **Firebase SDK configuration** into `.env` file and evnironment variables of your production Node (Example can be found at `.env.example`)

4. Deploy by using `firebase-tools`

```
firebase deploy
```

5. After deployment go to `/admin` URL and authenticate once

6. When unauthorized screen appear, go to [Firebasse Console](https://console.firebase.google.com/) and copy your **User UID** located at *Develop / Authentication* tab

7. Add **User UID** into Firestore `/system/admins/uids` array and **make sure there's no empty value in array (just in case)**

Contributing
------------

We welcome all contributions by sending PR to this repository.

Need Help ?
-----------

If you need help with anything, here're following methods:

#### Create an Issue

If you have something you want to discuss in detail, or have hit an issue which you believe others will also have in deployment or development of the system, [opening an issue](https://github.com/rayriffy/rayriffy-vote/issues) is the best way to get help. It creates a permanent resource for others wishing to contribute to conversation.

Donations
---------

If you like my project, please supporting me by [buying some coffee](https://www.buymeacoffee.com/rayriffy)
