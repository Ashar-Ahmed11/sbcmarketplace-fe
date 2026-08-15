now we are going to create the mechanism for the Finance Truck
# Finance Truck
## Backend
1. in the models folder create a new schema for Finance Truck which consist of the following fields:
   1. financer: id ref(user)
   2. categories: [{id ref(category)}]
   3. financeAmount:number
   4. financeCities:[{city:String}]
   5. date: Date (default date.now)
2. in the routes folder, create the respective route file for financeTruck to manage its crud endpoints.
## Frontend
## User Dashboard
1. In the user dashboard, add a new tab of Finance in the sidebar which takes the user to the Finance page of the user dashboard.
2. the ui of the Finance page is similar to the ui of the My Listings page.
   where it show the following cards for:
      1. Truck Finance
      2. Machinery Finance
      3. Construction Material Finance
      4. Spare Part Finance
3. clicking on the truck finance will take the user to the truck-finance page whose ui is similar to truck listing page.
In the truck finance page it will fetch and show all the truck finance listings whose financer matches the id of the logged in user.
4. Clicking on the edit button will take the user to the /edit-truck-finance/:truckFinanceID dynamic route which is described below in next point.
5. at the top right of the truck finance page, there will be a Create Truck Finance button which will take the user to the /create-truck-finance page which consist of all the inputs/dropdowns followed by the fields of the financeTruck schema.
   1. for the categories there should be a dropdown select which fetches all the categories whose type is truck. (use the same dropdown select which is used all across other places)
   2. number input for finance amount
   3. for the finance cities there should also be a dropdown select which consist of all the cities of pakistan.
6. The UI of the edit truck finance page will be same as create truck finance page where all the things will be pre filled.

# Finance Truck Negotiation
## Backend
1. in the models folder create a new schema for Finance Truck negotiation which consist of the following fields:
   1. buyer: id ref(user)
   2. seller: id ref(user)
   3. truck: id ref(truck)
   4. financeTruck: id ref(financeTruck)
   5. buyerDeliveryAddress: string
   6. buyerDeliveryCity:string
   7. negotiation:[{
      negotiator:string enum('buyer','seller')
      truckCost:number
      downPayment:number
      deliveryAmount:number
      totalAmount:number
      installments:[{amount:number,date:Date, status: {enum('unpaid', 'pendingApproval','paid') default 'unpaid'}, installmentScreenshots:[{url:string}]}]
      costAccepted: boolean default false
      accepted:boolean default false
      }]
   8. advanceStatus:string enum('unpaid', 'pendingApproval','paid') default 'unpaid'
   9. advanceStatusRejectionReason: string
   10. advancePaymentScreenshots:[{url:string}]
   11. downPaymentStatus:string enum('unpaid', 'pendingApproval','paid') default 'unpaid'
   12. downPaymentRejectionReason:string
   13. downPaymentScreenshots:[{url:string}]
   14. purhcaseOrderDate: Date
2. in the routes folder, create the respective route file for financeTruckNegotiation to manage its crud endpoints.

## User Dashboard
1. In the user dashboard, add a new tab of My Negotiations in the sidebar which takes the user to the My Negotiations page of the user dashboard.
2. The UI of the Negotiations page should be similar to the Ui of View listings, when the User clicks on the Finance Negotiations then it should navigate the user to the Finance Negotiations page.
3. The UI Of the Finance negotiations page will be similar to the ui of the listings page, where it will show the finance cards.
4. Clicking on the Truck Finance Negotiation will navigate the user to the Truck Finance Negotiation page.
5. The UI of Truck Finance Negotiation page is also similar to Truck Lisitng page.
In the Truck Finance Negotiation page it will fetch and show all the negotiations whose buyer or seller field matches the logged in user id.
4. Clicking on the view button will take the user to the /truck-finance-negotiation/:financeTruckNegotiationID dynamic route which is described below in next point.



## Truck Details Page
1. in the truck details page when the user clicks on request financing then it will open a bootstrap modal for request financing following.
2. the finance modal should follow the theme of the website.
3. in the modal, it should show the following inputs:
   1. buyerDeliveryAddress
   2. buyerDeliveryCity
4. Clicking the send request button will does the following:
   it will call the /create-finance-request post request endpoint which does the following:
      1. it takes the buyerDeliveryAddress, buyerDeliveryCity, truckid as input in the req.body.
      2. this is what happens inside the endpoint, it gets a list of all financeTruck listings whose financeAmount is greater than or equal to the truck.price and truck.deliveryLocation[].city includes the buyerDeliveryCity.
      4. then using each financeTruck listing, create a finance truck negotiation where the:
         buyer id will be the id of the authenticated user
         seller id will be truck.user
         truck id will be truck._id
         financeTruck will be the respective financeTruck id
         buyerDelivery address will be the one provided in req.body
         same goes for buyerDeliveryCity
         negotiation[0].truckCost will be truck.price
         the rest of the fields will be default/null
      5. then it will return the number of finance truck negotiation that are created
5. after successfully sending, in the modal show that your finance request has been successfully sent to X number of financers.
a view requests button will also become visible, clicking it will take the user to the truck finance negotiation page of the user dashboard.

## Finance Truck Negotiation

4. the Finance Truck Negotiation-negotiation/:Finance Truck NegotiationnegotiationID dynamic route of the user dashboard.
   5. The UI of the negotiation sceen should follow the UI of the figma design: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=249-2976&t=Q68W0nWhC32fdKID-4)
   Here it will render all the negotiations of the negotiation array of the Finance Truck Negotiation negotiation object.
   6. instead of showing 1 enter your offer input, there should be a counter offer button.
   7. Clicking the counter offer button will open a bootstrap model for Submit Cuounter offer, which consists of the following inputs:
      1. truckCost:number
      2. downPayment:number
      3. deliveryAmount:number
      4. totalAmount:number
      5. for installments there will be a add installment and remove installments button to add and remove installment.
      each installment will consist of the following inputs:
         1. number input for instalment.amount
         2. date picker for instalment.date
      
      Clicking on the Submit button of the counter offer modal will add another negotiation object with the provided information.
      If the counter offer is submitted by buyer to the negotiatior will be buyer.
      If seller then it will be seller.
   8. With each negotiation of the counter party, there should be a Accept button with each of them.
   but if the deliveryAmount is 0 then instead of showing Accept button show Confirm Cost button and below the button show this helper text which says:
   Confirms the truck cost and requests the financer to provide the delivery cost.
   9. Clicking the Confirm cost button will make the costAccepted boolean true
   10. once the costAccepted is true then mark the costAccepted true for that particular negotiaton.
   11. Clicking the accept button will make the accepted boolean true of the respective negotiation offer.
   12. Once a negotiation is accepted then the Pay Advance Fee section will become visible having the following UI: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=253-3090&t=Q68W0nWhC32fdKID-4) .
   13. In the Pay Advance Fee Section:
       1. leave the Pay Online button unused for now.
       2. Show the Finance Truck Negotiation Cost and Delivery Cost.
       3. Show the Amount of Advance Fee
          1. The Advance fee is calculated as follows:
             (downPayment+deliveryCost)*advancePercentage
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
          1. Agreed Finance Truck Negotiation Down Payment Cost=downPayment
          2. Agreed Delivery Cost=deliveryCost
          3. Agreed Total Cost = Finance Truck Down Payment Negotiation Amount+Delivery
          4. Advance Fee Paid= Yes
          5. Advance Fee Amount = Agreed Total Cost *advancePercentage
          6. Platform Fee = Agreed Total Cost *platformFeePercentage
          7. Amount to be Paid= agreed total cost - advance fee amount + platform fee
       the same mechanism applies for the upload payment proof just like Advance Fee, and clicking the submit button in the modal will make the images part of the finalPaymentScreenshots array and finalPaymentStatus will change to pendingApproval.
       10. once the finalPaymentStatus is approved then it should update the purchaseOrderDate to the current date and it will show negotiation successful and a Purchase Order will be visible which consist of the following informations:
          1. The Strucutre of the Finance Truck Negotiation Purchase Order should be similar to the reference purchase order image ![reference purchase order](image.png).
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
            1. Title (render the Truck title)
            2. Category (render the category name of the Truck)
            3. Truck Brand
            4. Truck Down Payment
            In the last(total column) and second last column of the table show the following breakdown:
             1. Subtotal=downPayment
         2. Delivery Cost = deliveryCost
          3. Advance Fee Amount = (downPayment+deliveryCost)*advancePercentage
          4. Platform Fee = (downPayment+deliveryCost-advance fee amount)*platformFeePercentage
          5. Total= (downPayment+deliveryCost)+ platform fee
          6. after the table in place of the Payment Terms, it should be Delivery Details
            2. Delivery Location: buyerDeliveryAddress
            3. Delivery City: buyerDeliveryCity
         7. on the right side also render these things as well:
               1. totalAmount
               6. Installments: render all the installments in a table
         7. Next write some hardcoded Special instructions of SBC Marketplace Purchase order.
         8. thats it for the purchase order.
         9. after the purhcase order there will be a manage instalments button.
         10. Clicking the manage installments button will navigate the user to the /truck-instalment/:financeTruckNegotiationnegotiationID dynamic route.
## Truck Instalment
   1. the dynamic truck instalment page shows all the installments of the accepted negotiation.
   2. with each installment there will be a pay online and upload payment proof button.
   3. clicking the Upload Payment Proof button will open the Upload Payment Proof bootstrap modal having the image upload and image preview mechanism just like listing creation.
       7. after clicking on Submit, These images will become part of the installmentScreenshots array and the status of that particular installemtn will change from unpaid to pendingApproval.
       8. once the status has been changed to paid by the admin then the installment status will change from pending to paid and the pay online and upload payment proof button will become invisible.

## Admin Dashboard
### Negotiations
1. In the admin dashboard, add a new tab of View Negotiations in the sidebar which takes the admin to the View Negotitions page of the admin dashboard.
2. The UI of the Negotiations page should be similar to the Ui of View listings, when the Admin clicks on the Finance Negotiations then it will take the admin to the finance negotiations page.
3. The UI of the Finance Negotiations page will be similar to the ui of the Negotiations page, where it will show the card for Truck Finance, Machinery Finance, Construction Material Finance, Spare Part Finance
4. Clicking on the Truck Finance will take the user to the truck finance page
3. The UI of Truck Finance Negotiations page is also similar to the Truck Lisitng page whcih will render all the negotiations of all the Users.
4. Clicking on the view button of a particular Finance Truck Negotiation negotiation will take the admin to the finance-truck-negotiation-detail/:financeTruckNegotiationID.
5. The UI of the Finance Truck Negotiation negotiation detail page will follow the UI of the admin dashboard where it will render all the information of the respective Finance Truck Negotiation.
6. In the Rental Truck Negotiation negotiation detail page, the admin can change the status from the dropdown of advanceStatus and finalPaymentStatus.
7. After changing the statuses, the admin can hit the Update button to edit the changes.

### Installments
1. In the admin dashboard, add a new tab of View Instalments in the sidebar which takes the admin to the View Instalments page of the admin dashboard.
2. The UI of the view instalments page of the admin dashboard is similar to the ui of the view listings page.
3. Clicking on the truck installment will take the admin to the truck instalment page, where it will show all the accepted negotiation installments of financeTruckNegotiations of all the users.
4. Clicking a particular instalment will take the admin to the /truck-instalment/:financeTruckNegotiationID, where it will show all the instalments where the admin can view the payment proof images and can update the status of a particular instalment.

   
      
