now we are going to create the mechanism for the Spare Part having the same mechanism as trucks negotiation which has been implemented.
# Spare Part Negotiation
## Backend
1. in the models folder create a new schema for Spare Part negotiation which consist of the following fields:
   1. buyer: id ref(user)
   2. seller: id ref(user)
   3. sparePart: id ref(sparePart)
   4. sellerDelivery: boolean
   5. buyerDeliveryAddress: string
   6. buyerDeliveryCity:string
   7. negotiation:[{
      negotiator:string enum('buyer','seller')
      sparePartCost:number
      deliveryCost:number
      accepted:boolean default false
      }]
   8. advanceStatus:string enum('unpaid', 'pendingApproval','paid') default 'unpaid'
   9. advanceStatusRejectionReason: string
   10. advancePaymentScreenshots:[{url:string}]
   11. finalPaymentStatus:string enum('unpaid', 'pendingApproval','paid') default 'unpaid'
   12. finalPaymentStatusRejectionReason:string
   13. finalPaymentScreenshots:[{url:string}]
   14. purhcaseOrderDate: Date
2. in the routes folder, create the respective route file for sparePartNegotiation to manage its crud endpoints.
## Frontend
## User Dashboard
1. In the user dashboard, add a new tab of My Negotiations in the sidebar which takes the user to the My Negotiations page of the user dashboard.
2. the ui of the my negotiations page is similar to the ui of the My Listings page.
3. clicking on the spare part negotiation will take the user to the spare-part-negotiations page whose ui is similar to Spare Parts listing page.
In the spare parts negotiation page it will fetch and show all the negotiations whose buyer or seller field matches the logged in user id.
4. Clicking on the view button will take the user to the /spare-parts-negotiation/:sparePartsNegotiationID dynamic route which is described below in next point.

## Spare Part Details Page
1. [Spare PartDetailsSidebarCards.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/Spare PartDetailsSidebarCards.jsx) write Offer Spare Part Amoount instead of Offer Amount.
2. remove the message textarea in the submit your offer card.
3. In the select delivery type if the user selects Seller delivery then below the buttons, 1 city dropdown, 1 text input, 1 number input for Buyer Delivery City and Buyer Delivery Address and delivery cost (as per the Spare Part negotiation schema) should become visible.
4. If SBC Delivery is selected then no need to show the dropdown and address input and delivery cost input.
5. when clicking on submit offer button then it should open a bootstrap confirmation modal saying that are you sure you want to submit an offer etc. 
   1. When the user clicks on submit then it should create a Spare Part negotiation with the provided information.
   2. make sure the UI of the confirmation modal matches the UI and theme of the website.
   3. after clicking the submit button the Spare Part negotiation document should be created as follow:
      1. the create Spare Part negotiation endpoint uses the authtoken middleware by which we can get the user id and use it in the buyer field.
      2. the seller id comes from the respective Spare Part listing document.
         1. from the frontend the Spare Partid is sent in the req.body, so inside the endpoint using the Spare Partid you retrieve the Spare Part document from whcih you can retrieve the sellerid.
      3. the Spare Partid is sent in the req.body from the frontend
      4. sellerDelivery(true or false) as per the selected buttom of the submit your offer form.
      If user selects sbc delivery then sellerDelivery will be false.
      5. the buyerDeliveryAddress, buyerDeliveryCity will also be sent in the req.body from the frontend to be used in the endpoint.
      6. at the time of Spare Part negotiation creation, in the negotiation array, 1 object will be added where
         1. negotiator will be 'buyer'
         2. sparePartCost will be the amount that is taken from the Offer Spare Part Amount from the offer form.
         3. If the sellerDelivery is false then the deliveryCost will be null, otherwise use the deliery cost that is provided in the offer form by the user.
      7. the rest of the fields of the Spare Part negotiation document should be null/default
   4. when a negotiation is submitted then it should navigate the user to the Spare Part-negotiation/:Spare PartnegotiationID dynamic route of the user dashboard.
   5. The UI of the negotiation sceen should follow the UI of the figma design: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=249-2976&t=Q68W0nWhC32fdKID-4)
   Here it will render all the negotiations of the negotiation array of the Spare Part negotiation object.
   6. instead of showing 1 enter your offer input, there should be a counter offer button.
   7. Clicking the counter offer button will open a bootstrap model for Submit Cuounter offer, which consists of the following inputs:
      1. Spare Part Cost Number input
      2. Delivery Cost Number input
      Clicking on the Submit button of the counter offer modal will add another negotiation object with the provided information.
      If the counter offer is submitted by buyer to the negotiatior will be buyer.
      If seller then it will be seller.
   8. With each negotiation of the counter party, there should be a Accept button with each of them.
   9. Clicking the accept button will make the accepted boolean true of the respective negotiation offer.
   10. Once a negotiation is accepted then the Pay Advance Fee section will become visible having the following UI: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=253-3090&t=Q68W0nWhC32fdKID-4) .
   11. In the Pay Advance Fee Section:
       1. leave the Pay Online button unused for now.
       2. Show the Spare Part Cost and Delivery Cost.
       3. Show the Amount of Advance Fee
          1. The Advance fee is calculated as follows:
             (sparePartCost+deliveryCost)*advancePercentage
          The advancePercentage comes from the basic info which admin has controlled.
       4. Show the Platform Fee
          1. The Platform fee is calculated as follows:
             Advance Fee*platformFeePercentage
          The platformFeePercentage comes from the basic info which admin has controlled.
       5. Show the Total Amount to be paid
          The Total amount is the sum of Advance and Platform Fee.
       6. clicking the Upload Payment Proof button will open the Upload Payment Proof bootstrap modal having the image upload and image preview mechanism just like listing creation.
       7. after clicking on Submit, These images will become part of the advancePaymentScreenshots array and the advanceStatus will change from unpaid to pendingApproval.
       8. once the status has been changed to paid by the admin then this section will now become invisible just like negotiations and now this Final Payment section will be visible following the UI of the figma design: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=253-3171&t=Q68W0nWhC32fdKID-4).
       9. In this final payment section it will show the following amounts:
          1. Agreed Spare Part Cost=sparePartCost
          2. Agreed Delivery Cost=deliveryCost => Show this line item only when the sellerDelivery is true, otherwise hide it because the deliveryCost would be 0.
          3. Agreed Total Cost = Spare Part+Delivery
          4. Advance Fee Paid= Yes
          5. Advance Fee Amount = Agreed Total Cost *advancePercentage
          6. Platform Fee = Agreed Total Cost *platformFeePercentage
          7. Amount to be Paid= agreed total cost - advance fee amount + platform fee
       the same mechanism applies for the upload payment proof just like Advance Fee, and clicking the submit button in the modal will make the images part of the finalPaymentScreenshots array and finalPaymentStatus will change to pendingApproval.
       10. once the finalPaymentStatus is approved then it should update the purchaseOrderDate to the current date and it will show negotiation successful and a Purchase Order will be visible which consist of the following informations:
          1. The Strucutre of the Spare Part Purchase Order should be similar to the reference purchase order image ![reference purchase order](image.png).
          2. the UI of the purchase order should be designed as per the sbc theme and should have sbc logo
          3. The following described information which the purchase order will show will be all rendered from the respective negotiation document(these all information will be taken from the respective negotiation document and use .populate for populating the ids) 
          4. In place of Vendor it should be Buyer
             1. In this column the following info should be visible:
                1. Full Name
                2. Address
                3. City, State, Zip Code
                4. Phone Number
                   the respective fields are added in the [user.js](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/server/models/user.js) 
                   so wire them up with the user dashboard as follows:
                   1. In the user dashboard, add a new tab of basic info in the sidebar which takes the user to the basic info page of the user dashboard.
                  2. The UI of the basic info page is simple, where it should render and prefill the following basic info fields in text, dropdown and number inputs as per the user schema fields.
         5. In place of Ship To it should be Seller which should also render the same information of the seller the similar way as it is rendered for the user.
         6. In Purchase Order Date render the purhcaseOrderDate.
         7. The item table should consist of the following columns:
            1. Title (render the Spare Part title)
            2. Category (render the category name of the Spare Part)
            3. Spare Part Brand
            4. Spare Part cost
            In the last(total column) and second last column of the table show the following breakdown:
             1. Subtotal=sparePartCost
         2. Delivery Cost = deliveryCost
          3. Advance Fee Amount = (sparePartCost+deliveryCost)*advancePercentage
          4. Platform Fee = (sparePartCost+deliveryCost-advance fee amount)*platformFeePercentage
          5. Total= (sparePartCost+deliveryCost) - advance fee amount + platform fee
          6. after the table in place of the Payment Terms, it should be Delivery Details
            1. Seller Delivery: "Provided" if sellerDelivery is true otherwise it should be "Not Provided"
            2. Delivery Location: buyerDeliveryAddress
            3. Delivery City: buyerDeliveryCity
         7. Next write some hardcoded Special instructions of SBC Marketplace Purchase order.
         8. thats it for the purchase order.
## Admin Dashboard
1. In the admin dashboard, add a new tab of View Negotiations in the sidebar which takes the admin to the View Negotitions page of the admin dashboard.
2. The UI of the Negotiations page should be similar to the Ui of View listings, when the Admin clicks on the Spare Parts Negotiation then it should navigate the admin to the Spare Part-neogtiations page.
3. The UI of Spare Part Negotiations page is also similar to Spare Parts Lisitng page whcih will render all the negotiations of all the Users.
4. Clicking on the view button of a particular Spare Part negotiation will take the admin to the negotiation-detail/:Spare PartNegotiationID.
5. The UI of the Spare Part negotiation detail page will follow the UI of the admin dashboard where it will render all the information of the respective Spare Part negotiation.
6. In the Spare Part negotiation detail page, the admin can change the status from the dropdown of advanceStatus and finalPaymentStatus.
7. After changing the statuses, the admin can hit the Update button to edit the changes.

      


2. in the routes folder, create the respective route file for basic info to manage its crud endpoints.