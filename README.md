# baburb-sem1

Live Heroku deployment -> https://baburb-sem1.herokuapp.com

# Gallery

Build a website for up and coming artists/photographers to advertise their products.

---

## Testing

The system should include at least five items for sale from each of the artist accounts listed below.

You are required to create the following accounts to allow the system to be tested. All accounts should have the password `p455w0rd`:

1. `artist1`
2. `artist2`
3. `buyer1`
4. `buyer2`

---

## Stage 1

The core functionality consists of three screens.

### Part 1

The home page should be viewable without needing to be logged in and should display **all** the items that all the `artists` want to sell arranged with the most recent at the top. Each should have:

1. The name of the item
2. A thumbnail image
3. The price the seller is asking for
4. A status, one of the following:
    1. for sale.
    2. under offer.
    3. sold.
5. The name and phone number of the `artist`.

### Part 2

If a user is logged in, there should be a link on the home page that takes an `artist` page to their **selling** page which should list all the items they has for sale. This should include:

1. The name of the item
2. A thumbnail image
3. The status (see above) with the option for the user to change the status.
4. The option to delete items.

### Part 3

There should be a link or button on the **selling** page to add new items to the list. This page should ask for:

1. The item name.
2. A photo uploaded from the `artist's` computer.
3. A detailed, multi-line, formatted description.
4. The asking price.

---

## Stage 2

The intermediate tasks require you to make changes to the functionality:

1. Each user should have their own home page (all using the same template) and the items they have for sale should be displayed here. The home page should now list each of the users and the name of their business which should have an avatar image. There should also be an indicator against each user as to how many items they have for sale. Clicking on a user/shop on the home page takes the visitor to the user's own home page.
2. The next feature is to implement a simple e-commerce system:
    1. Each account should now store a registered address
    2. There should no longer be a name and phone number listed for each item, instead, clicking on an item takes the user to a product detail screen with a _Buy Now_ button.
    3. Clicking the button takes the user to a (fake) payment screen
    4. Once payment is made the status should change and the buyer's name and address be added to the product detail page.
    5. Finally the seller should be sent a nicely formatted html email with details of the item and buyer plus a link to the item detail page
 public.

---

## Stage 3

1. Users should enter their paypal username when creating their account.
2. Users who are interested in a piece of artwork can make an online payment (fake the paypal payment screen).
3. When an item is paid for:
    1. It should be flagged as sold so that no-one else can buy.
    2. An email should be sent to the seller with details of the buyer.
4. Users can perform a global search for items of interest. This should search the title as well as short and long descriptions.
5. The gallery and details page should display low-res thumbnail photos
    1. Clicking on a thumbnail should display the full-size image with a watermark added.
6. The seller can edit item details and remove them when sold.

----

## Extras

In some assignment briefs you are given marks for the appropriate use of media and using sensors built into the user's device.

### Sensors

In some assignment briefs you are given marks for the appropriate use of sensors and sensor data. You should be implementing:

1. When adding a new item to the gallery, the user should be given the option to capture the image using the device camera (if available).
2. When the buyer's details are displayed, this should include their location (country and region only).
3. When the buyer makes a purchase, the delivery address fields should be pre-filled with information from their current location, with the buyer able to change this. The changed details should be stored and then used to pre-fill the form in future.

### Media

In the requirements listed above you need to provide the user with the ability to upload photos. For the extra media marks you will need to expand this by:

1. Providing the user with the choice of uploading photos, video clips or audio clips.
2. Giving users the option to directly capture images, audio and video clips using the built-in camera and/or microphone if available.

### Data

There are lots of online RESTful APIs you can make use of when developing this system. You should consider:

1. [LocationIQ](https://locationiq.com)
