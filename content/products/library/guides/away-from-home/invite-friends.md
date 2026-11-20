---
title: "Invite friends to your Library through the apps"
description: "Create a one-time invitation as a link and QR code, choose what a friend can see, and learn how it opens the Library app or the app store, with a browser fallback."
audience: administrator
category: guide
product_area: networking
status: early-access
---

# Invite friends to your Library through the apps

Once your Library can be reached from outside, you can let a friend or relative in without giving them your password or doing anything on their device. You create an **invitation**, which is a link and a QR code. They scan it with their phone. It opens the Library app already pointed at your server, they choose a password or a passkey, and they are in. Nobody types an address.

## The idea, and why it goes through the apps

The route is the Library **app** on their phone, tablet or TV, not a web page, for three reasons:

- The app already holds the connection to your server and the sign-in, so your friend does not have to bookmark an address or keep a browser tab.
- The app switches addresses by itself when your friend is on your home network or away from it (the Android app does this today; see [Native clients](../../product/native-clients.md)).
- A mobile browser is the fallback, not the route.

An invitation uses the same system as adding someone in **Settings → Users & Households**. It is not a separate, weaker kind of account.

## What a friend needs

- Away-from-home access that works. Run the **Test** step first. See [Testing and troubleshooting](testing-and-troubleshooting.md).
- With **Tailscale**, the friend must also be able to reach your private address, so they need Tailscale too, and you must share your server with them or invite them to your Tailscale network. Then the invitation works as below. This is the extra effort Tailscale asks of every person. See [Tailscale](tailscale.md).
- With an **own address** (tunnel, Caddy, nginx, router door), the friend needs nothing but the Library app.

## Create an invitation

The guided flow offers a **Share with friends** card in the **Choose** step, and the Test step offers it again once outside access works. You can also use **Settings → Users & Households → Users → Add a sign-in**, which shows the same invitation.

1. Choose **Share with friends** (or **Invite someone**).
2. Pick **A new person** and enter a name and email, or **A profile without a sign-in** to give an existing profile its own sign-in.
3. **Choose what they can see.** The same household and library pickers you use when adding anyone appear here:
   - **Household.** Which household they belong to, for example Friends.
   - **Libraries.** Which libraries they can open, for example Movies and TV.

   A friend never sees more than you choose here. You can change it later in **Settings → Manage Profiles**. See [Households](../households.md).
4. Create the invitation. Library shows:
   - the **link** and a **QR code**,
   - a short code you can read out (for example `KQ7M4-XH2TA`),
   - **Copy** buttons,
   - when it expires.

Library does not send email for you. You send the link or show the QR yourself, in a private message or in person.

## What the invitation can and cannot do

| | |
|---|---|
| Works how many times | **Once.** After your friend accepts, the same link no longer works. |
| Lasts | **7 days** by default. The lifetime comes from **Users & Households → Advanced**. After that a new invitation is needed. |
| Stored | Only a fingerprint of the code. It cannot be shown again, so copy it before you leave the screen. |
| Account type | Always a password or passkey. A guest never has a no-password account. |
| Access | Only the household and libraries you picked. |
| Wrong or old code | A plain "this invitation is not valid" answer, the same for both, and repeated wrong codes from outside are slowed down. |

Treat the link like a password until it is used. Send it privately, and do not post the QR where others can scan it.

## What your friend does

1. **Scan the QR code** with their phone's camera, or open the link.
2. **If the Library app is installed**, it opens with your server's address and the invitation already filled in, using the same pairing the app uses for any device.
3. **If it is not installed**, the link's page sends them to their phone's app store (Apple App Store or Google Play) to install the Library app. Afterwards the invitation carries on where it left off.
4. They see the email the invitation was made for and **choose a password**, or set up a **passkey**.
5. They are signed in, and see only what you chose.

For a TV, the friend signs in on their phone and pairs the TV with the usual device code. Apps that exist today are listed on [Native clients](../../product/native-clients.md).

## If the app is not an option

A mobile web browser still works. The link opens a page in the browser, they choose a password there, and they sign in on that page afterwards. Use it for a device with no app. Passkeys in a browser need the address to be your secure address. See [HTTPS and certificates](https-and-certificates.md).

## If it does not work

| What your friend sees | What to try |
|---|---|
| "This invitation is not valid" | It was already used or has passed 7 days. Make a new one. |
| The page does not load | Your outside address is not reachable from their network. Run the Test step. With Tailscale, they must be connected to Tailscale. |
| The app store opens, but the app is not there for their device | Use the browser fallback. |
| They can sign in but see nothing | Check the household and libraries in **Settings → Manage Profiles**. |

## Taking it back

- **Not yet accepted:** the invitation stops working when it expires. If it went to the wrong person, delete that person's sign-in in **Settings → Users & Households → Users** (**Delete sign-in**), check that it is gone from the list, and make a new invitation for the right person.
- **Already accepted:** remove the sign-in from **Settings → Users & Households → Users** (**Delete sign-in**), and sign out their phone or browser in **Settings → Security & Devices → Devices**.

## Next steps

- [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md)
- [Turn access off](turn-access-off.md)
- [Households](../households.md)
