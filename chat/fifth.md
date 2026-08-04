# Admin Fee Structure
## Backend
1. in the models folder create a new schema for basic info which consist of the following fields:
   1. advancePercentage
   2. platformFeePercentage
2. in the routes folder, create the respective route file for basic info to manage its crud endpoints.
programatically call the create basic info endpoint to create a basic info document which can be edited.
## Frontend
1. In the admin dashboard, add a new tab of basic info in the sidebar which takes the admin to the basic info page of the admin dashboard.
2. The UI of the basic info page is simple, where it should render and prefill the following basic info fields in number inputs which can be updated by clicking on the update button.

# Truck Negotiation
## Backend
1. in the models folder create a new schema for truck negotiation which consist of the following fields:
   1. buyer: id ref(user)
   2. seller: id ref(user)
   3. truck: id ref(truck)
   4. sellerDelivery: boolean
   5. buyerDeliveryAddress: string
   6. buyerDeliveryCity:string
   7. negotiation:[{
      negotiator:string enum('buyer','seller')
      truckCost:number
      deliveryCost:number
      accepted:boolean default false
      }]
   8. advanceStatus:string enum('unpaid', 'pendingApproval','paid') default 'unpaid'
   9. advancePaymentScreenshots:[{url:string}]
   10. finalPaymentStatus:string enum('unpaid', 'pendingApproval','paid') default 'unpaid'
   11. finalPaymentScreenshots:[{url:string}]
2. in the routes folder, create the respective route file for truckNegotiation to manage its crud endpoints.
## Frontend
## User Dashboard
1. In the user dashboard, add a new tab of My Negotiations in the sidebar which takes the user to the My Negotiations page of the user dashboard.
2. the ui of the my negotiations page is similar to the ui of the My Listings page.
3. clicking on the truck negotiation will take the user to the trucks-negotiations page whose ui is similar to trucks listing page.
In the trucks negotiation page it will fetch and show all the negotiations whose buyer or seller field matches the logged in user id.
4. Clicking on the view button will take the user to the /truck-negotiation/:trucknegotiationID dynamic route which is described below in next point.

## Trucks Details Page
1. [TruckDetailsSidebarCards.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/TruckDetailsSidebarCards.jsx) write Offer Truck Amoount instead of Offer Amount.
2. remove the message textarea in the submit your offer card.
3. In the select delivery type if the user selects Seller delivery then below the buttons, 1 city dropdown, 1 text input, 1 number input for Buyer Delivery City and Buyer Delivery Address and delivery cost (as per the truck negotiation schema) should become visible.
4. If SBC Delivery is selected then no need to show the dropdown and address input and delivery cost input.
5. when clicking on submit offer button then it should open a bootstrap confirmation modal saying that are you sure you want to submit an offer etc. 
   1. When the user clicks on submit then it should create a truck negotiation with the provided information.
   2. make sure the UI of the confirmation modal matches the UI and theme of the website.
   3. after clicking the submit button the truck negotiation document should be created as follow:
      1. the create truck negotiation endpoint uses the authtoken middleware by which we can get the user id and use it in the buyer field.
      2. the seller id comes from the respective truck listing document.
         1. from the frontend the truckid is sent in the req.body, so inside the endpoint using the truckid you retrieve the truck document from whcih you can retrieve the sellerid.
      3. the truckid is sent in the req.body from the frontend
      4. sellerDelivery(true or false) as per the selected buttom of the submit your offer form.
      If user selects sbc delivery then sellerDelivery will be false.
      5. the buyerDeliveryAddress, buyerDeliveryCity will also be sent in the req.body from the frontend to be used in the endpoint.
      6. at the time of truck negotiation creation, in the negotiation array, 1 object will be added where
         1. negotiator will be 'buyer'
         2. truckCost will be the amount that is taken from the Offer Truck Amount from the offer form.
         3. If the sellerDelivery is false then the deliveryCost will be null, otherwise use the deliery cost that is provided in the offer form by the user.
      7. the rest of the fields of the truck negotiation document should be null/default
   4. when a negotiation is submitted then it should navigate the user to the truck-negotiation/:trucknegotiationID dynamic route of the user dashboard.
   5. The UI of the negotiation sceen should follow the UI of the figma design: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=249-2976&t=Q68W0nWhC32fdKID-4)
   Here it will render all the negotiations of the negotiation array of the truck negotiation object.
   6. instead of showing 1 enter your offer input, there should be a counter offer button.
   7. Clicking the counter offer button will open a bootstrap model for Submit Cuounter offer, which consists of the following inputs:
      1. Truck Cost Number input
      2. Delivery Cost Number input
      Clicking on the Submit button of the counter offer modal will add another negotiation object with the provided information.
      If the counter offer is submitted by buyer to the negotiatior will be buyer.
      If seller then it will be seller.
   8. With each negotiation of the counter party, there should be a Accept button with each of them.
   9. Clicking the accept button will make the accepted boolean true of the respective negotiation offer.
   10. Once a negotiation is accepted then the Pay Advance Fee section will become visible having the following UI: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=253-3090&t=Q68W0nWhC32fdKID-4) .
   11. In the Pay Advance Fee Section:
       1. leave the Pay Online button unused for now.
       2. Show the Amount of Advance Fee
         1. The Advance fee is calculated as follows:
            truckCost*advancePercentage
         The advancePercentage comes from the basic info which admin has controlled.
       3. Show the Platform Fee
          1. The Platform fee is calculated as follows:
            truckCost*platformFeePercentage
         The platformFeePercentage comes from the basic info which admin has controlled.
       4. Show the Total Amount to be paid
         The Total amount is the sum of Advance and Platform Fee.
       5. clicking the Upload Payment Proof button will open the Upload Payment Proof bootstrap modal having the image upload and image preview mechanism just like listing creation.
       6. after clicking on Submit, These images will become part of the advancePaymentScreenshots array and the advanceStatus will change from unpaid to pendingApproval.
       7. once the status has been changed to paid by the admin then this section will now become invisible just like negotiations and now this Final Payment section will be visible following the UI of the figma design: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=253-3171&t=Q68W0nWhC32fdKID-4).
      8. In this final payment section it will show the following amounts:
         1. Agreed Price=truckCost
         2. Advance Fee Paid= Yes
         3. Advance Fee Amount = truckCost*advancePercentage
         4. Platform Fee = truckCost*platformFeePercentage
         5. Amount to be Paid= agreed price - advance fee amount + platform fee
      the same mechanism applies for the upload payment proof just like Advance Fee, and clicking the submit button in the modal will make the images part of the finalPaymentScreenshots array and finalPaymentStatus will change to pendingApproval.
      9. once the finalPaymentStatus is approved then it will show negotiation successful and a Purchase Order will be visible which consist of the following informations:
      


2. in the routes folder, create the respective route file for basic info to manage its crud endpoints.