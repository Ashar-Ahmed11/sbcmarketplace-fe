# Truck Inspection Report
## Backend
1. 1. in the models folder create a new schema for Truck Inspection Report negotiation which consist of the following fields:
   1. inspectionRequester: id ref(user)
   2. inspector: id ref(user)
   3. truckInspectionServiceNegotiation: id ref (truckInspectionServiceNegotiation)
   4. status: string enum('pending approval','approved','rejected') default 'pending approval'
   5. rejectionReason: string
   6. inspectionDate: date default date.now
   7. engineCondition:{score:number,images:[{url:string}]}
      8. engineCondition: { score: number, images: [{ url: string }] },
      9. hydraulicSystem: { score: number, images: [{ url: string }] },
      10. transmission: { score: number, images: [{ url: string }] },
      11. undercarriage: { score: number, images: [{ url: string }] },
      12. boomAndArm: { score: number, images: [{ url: string }] },
      13. bucket: { score: number, images: [{ url: string }] },
      14. tyresOrTracks: { score: number, images: [{ url: string }] },
      15. cabin: { score: number, images: [{ url: string }] },
      16. electricalSystem: { score: number, images: [{ url: string }] },
      17. hourMeter: { score: number, images: [{ url: string }] },
      18. leakage: { isLeaked: boolean, images: [{ url: string }] },

2. in the routes folder, create the respective route file for truckInspectionReport to manage its crud endpoints.

## Frontend
## User Dashboard
1. In the user dashboard add another tab of Inspection same as Listings, where it shows all the types of inspection cards which include:
   1. Truck Inspection
   2. Machinery Inspection
   3. Spare Part Inspection
   4. Material Inspection
2. Clicking on the truck inspection will take the user to the truck inspection page, whose ui and other things will be similar to the truck listings page where it will show all the truck inspections whose (inspectionRequester id matches the logged in user and the truckInspectionReport.truckinspectionserviceNegotiation.finalPaymentStatus is paid) or inspector id matches the id of the logged in user.
   1. At the top right of the truck inspection page, there will be a create report button which takes the user to the /create-truck-inspection-report page.
   The Create Truck Inspection Report page ui and mechanism should be as follows:
   1. It shows all the sections and inputs as per the truckInspectionReport schema,
      1. at the start of the inspection form, there will be a search and select for select truck inspection negotiation the same way as it is used for product type in [transaction.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/referenceRepo/referenceComponent/transaction.jsx).
         1. it fetches and shows those truck inspection negotiations whose seller id matches the id of the logged in user and the advance status is paid.
         2. it shows the results whose buyer.fullname or buyer.username matches the search query. (it should be broad search)
      2. selecting a negotiation in the select truck inspection negotiation will use the buyer._id for the inspectionRequester field and use the selected negotiation id for the truckInspectionServiceNegotiation field from the selected negotiation.
   2. for the images of each section such as engineCondtion etc, use the same upload images and remove images mechanism for image upload and preview.
   3. at the bottom also show the inspection report preview which shows the inspection report following the entered details, the UI of the inspection report should be similar to the UI of the purchase order.
      1. In the inspection report also show the overall score which is the average of all the scores.
   4. Clicking on submit button will submit the truck inspection report and also adds & update the id of the newly created truck inspection report to the selected truck inspection negotiation document.
3. In the truck inspection page, if a user selects a truck inspection then if the logged in user is a inspectionRequester then only the report is visible to him.
If the logged in user is a inspector then all the pre filled form fields and other thigns will be visible to him, incouding the status(which he can only view as it is controlled by the admin)

## Admin Dashboard
1. In the admin dashboard add another tab of Inspection same as Listings, where it shows all the types of inspection cards which include:
   1. Truck Inspection
   2. Machinery Inspection
   3. Spare Part Inspection
   4. Material Inspection
2. Clicking on the truck inspection will take the user to the truck inspection page, whose ui and other things will be similar to the truck listings page where it will show all the truck inspections.
3. Clicking a particular inspection will take the admin to the inspection details page where all the thigns will be prefilled but are all disabled and can only be viewed.
4. The admin can only change the status from the dropdown and add a rejection reason the same way as it is done for all the other previous modules.



   


now we are going to create the mechanism for the Truck Inspection Service having the same mechanism as trucks negotiation which has been implemented.
# Truck Inspection Service Negotiation
## Backend
1. in the models folder create a new schema for Truck Inspection Service negotiation which consist of the following fields:
   1. buyer: id ref(user)
   2. seller: id ref(user)
   3. truck: id ref(truck)
   4. onSite: boolean
   5. buyerAddress: string
   6. buyerCity:string
   7. negotiation:[{
      negotiator:string enum('buyer','seller')
      labourCharges:number
      accepted:boolean default false
      }]
   8. advanceStatus:string enum('unpaid', 'pendingApproval','paid') default 'unpaid'
   9. advanceStatusRejectionReason: string
   10. advancePaymentScreenshots:[{url:string}]
   11. finalPaymentStatus:string enum('unpaid', 'pendingApproval','paid') default 'unpaid'
   12. finalPaymentStatusRejectionReason:string
   13. finalPaymentScreenshots:[{url:string}]
   14. truckInspectionReport: id ref(truckInspectionReport)
   15. purhcaseOrderDate: Date
2. in the routes folder, create the respective route file for truckInspectionServiceNegotiation to manage its crud endpoints.
## Frontend
## User Dashboard
1. In the user dashboard, add a new tab of My Negotiations in the sidebar which takes the user to the My Negotiations page of the user dashboard.
2. The UI of the Negotiations page should be similar to the Ui of View listings, when the User clicks on the Inspection Negotiations then it should navigate the admin to the Inspection Negotiations page.
3. The UI Of the inspections negotiations page will be similar to the ui of the listings page, where it will show the inspections card.
4. Clicking on the truck inspection negotiation will navigate the user to the truck inspection negotiation page.
5. The UI of Truck Inspection Service Negotiations page is also similar to Truck Inspection Services Lisitng page.
In the Truck Inspection Services negotiation page it will fetch and show all the negotiations whose buyer or seller field matches the logged in user id.
4. Clicking on the view button will take the user to the /inspection-service-negotiation/:truckInspectionServiceNegotiationID dynamic route which is described below in next point.

## Inspection Service Details Page
1. [ Inspection ServiceDetailsSidebarCards.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/Truck Inspection ServiceDetailsSidebarCards.jsx) write Offer Truck Inspection Service Amoount instead of Offer Amount.
2. remove the message textarea in the submit your offer card.
3. the user should also have a search and select input same as it is used for the select truck negotiation, but this time it will be used to search the query across all the trucks, spare parts, construction machinery, construction material whose category id matches the id of the inspectionService category as per the schema [inspectionService.js](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/server/models/inspectionService.js) .
If the selected product category.categoryType is truck then negotiation for the truckInspectionServiceNegotiation will be created when clicking on submit request.
If the category.categoryType is 'machinery', 'material','spareParts' then their respective negotiation will be created whose mechanism will be described later, for now we are working for trucks.
4. In the select delivery type if the user selects On-Site then below the buttons, 1 city dropdown, 1 text input for Buyer Delivery City and Buyer Delivery Address (as per the Truck Inspection Service negotiation schema) should become visible.
5. If Workshop is selected then no need to show the dropdown and address input and delivery cost input. (makes the onsite field false as per the schema)
6. when clicking on submit offer button then it should open a bootstrap confirmation modal saying that are you sure you want to submit an offer etc. 
   1. When the user clicks on submit then it should create a Truck Inspection Service negotiation with the provided information.
   2. make sure the UI of the confirmation modal matches the UI and theme of the website.
   3. after clicking the submit button the Truck Inspection Service negotiation document should be created as follow:
      1. the create Truck Inspection Service negotiation endpoint uses the authtoken middleware by which we can get the user id and use it in the buyer field.
      2. the seller id comes from the respective Truck Inspection Service listing document.
         1. from the frontend the Truck Inspection Serviceid is sent in the req.body, so inside the endpoint using the Truck Inspection Serviceid you retrieve the Truck Inspection Service document from whcih you can retrieve the sellerid.
      3. the Truck Inspection Serviceid is sent in the req.body from the frontend
      4. onSite(true or false) as per the selected button of the submit your offer form.
      If user selects Workshop then onSite will be false.
      5. if onSite is true then the buyerAddress, buyerCity will also be sent in the req.body from the frontend to be used in the endpoint.
      6. at the time of Truck Inspection Service negotiation creation, in the negotiation array, 1 object will be added where
         1. negotiator will be 'buyer'
         2. labourCharges will be 0
         
      7. the rest of the fields of the Truck Inspection Service negotiation document should be null/default
   4. when a negotiation is submitted then it should navigate the user to the Truck Inspection Service-negotiation/:Truck Inspection ServicenegotiationID dynamic route of the user dashboard.
   5. The UI of the negotiation sceen should follow the UI of the figma design: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=249-2976&t=Q68W0nWhC32fdKID-4)
   Here it will render all the negotiations of the negotiation array of the Truck Inspection Service negotiation object.
   6. instead of showing 1 enter your offer input, there should be a counter offer button.
   7. Clicking the counter offer button will open a bootstrap model for Submit Counter offer, which consists of the following inputs:
      1. Labour Charges Number input
      2. parts resbonsibility dropdown.
      Clicking on the Submit button of the counter offer modal will add another negotiation object with the provided information.
      If the counter offer is submitted by buyer to the negotiatior will be buyer.
      If seller then it will be seller.
   8. With each negotiation of the counter party, there should be a Accept button with each of them.
   9. Clicking the accept button will make the accepted boolean true of the respective negotiation offer.
   10. Once a negotiation is accepted then the Pay Advance Fee section will become visible having the following UI: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=253-3090&t=Q68W0nWhC32fdKID-4) .
   11. In the Pay Advance Fee Section:
       1. leave the Pay Online button unused for now.
       2. Show the Truck Inspection Service Cost and Delivery Cost.
       3. Show the Amount of Advance Fee
          1. The Advance fee is calculated as follows:
             (labourCharges)*advancePercentage
          The advancePercentage comes from the basic info which admin has controlled.
       4. Show the Platform Fee
          1. The Platform fee is calculated as follows:
             Advance Fee*platformFeePercentage
          The platformFeePercentage comes from the basic info which admin has controlled.
       5. Show the Total Amount to be paid
          The Total amount is the sum of Advance and Platform Fee.
       6. clicking the Upload Payment Proof button will open the Upload Payment Proof bootstrap modal having the image upload and image preview mechanism just like listing creation.
       7. after clicking on Submit, These images will become part of the advancePaymentScreenshots array and the advanceStatus will change from unpaid to pendingApproval.
       8. once the status has been changed to paid by the admin then this section will now become invisible just like negotiations and now the truck inspection report status section will be visible which shows the status pending if there is no id assigned to the truckInspectionReport field of the truckInspectionServiceNegotiation.

9. when the id to the truckinspectionreport is assigned then the status will be changed to pending approval following the status of the truckInspectionServiceNegotiation.truckInspectionReport.status
       
10. when the truckInspectionReport.status is changed to approved then the Final Payment section will be visible following the UI of the figma design: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=253-3171&t=Q68W0nWhC32fdKID-4).
       It should say that Pay Final Payment to view the report.
9. In this final payment section it will show the following amounts:
   1. Agreed Truck Inspection Service Cost=labourCharges
   2. Agreed Total Cost = Truck Inspection Service+Delivery
   3. Advance Fee Paid= Yes
   4. Advance Fee Amount = Agreed Total Cost *advancePercentage
   5. Platform Fee = Agreed Total Cost *platformFeePercentage
   6. Amount to be Paid= agreed total cost - advance fee amount + platform fee
       the same mechanism applies for the upload payment proof just like Advance Fee, and clicking the submit button in the modal will make the images part of the finalPaymentScreenshots array and finalPaymentStatus will change to pendingApproval.
10. once the finalPaymentStatus is approved then it should update the purchaseOrderDate to the current date and it will show negotiation successful and a Purchase Order will be visible which consist of the following informations:
    1. The Strucutre of the Truck Inspection Service Purchase Order should be similar to the reference purchase order image ![reference purchase order](image.png).
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
       1. Title (render the Truck Inspection Service title)
       2. Category (render the category name of the Truck Inspection Service)
       3. Truck Inspection Service cost
       In the last(total column) and second last column of the table show the following breakdown:
       1. Subtotal=labourCharges

3. Advance Fee Amount = (labourCharges)*advancePercentage
4. Platform Fee = (labourCharges)*platformFeePercentage
5. Total= (labourCharges) + platform fee
6. after the table in place of the Payment Terms, it should be Delivery Details
   1. On-Site Service: "Provided" if onSitge is true otherwise it should be "Not Provided"
   2. On-Site Location: buyerAddress
   3. On-Site City: buyerCity
9. Next write some hardcoded Special instructions of SBC Marketplace Purchase order.
10. thats it for the purchase order.
11. before the purchase order show a view inspection report button, clicking the button will navigate the user to the truck inspection report dynamic route of the user dashboard.
## Admin Dashboard
1. In the admin dashboard, add a new tab of View Negotiations in the sidebar which takes the admin to the View Negotitions page of the admin dashboard.
2. The UI of the Negotiations page should be similar to the Ui of View listings, when the Admin clicks on the Inspection Negotiations then it should navigate the admin to the Inspection Negotiations page.
3. The UI Of the inspections negotiations page will be similar to the ui of the listings page, where it will show the inspections card.
4. Clicking on the truck inspection negotiation will navigate the user to the truck inspection negotiation page.
5. The UI of Truck Inspection Service Negotiations page is also similar to Truck Inspection Services Lisitng page whcih will render all the negotiations of all the Users.
6. Clicking on the view button of a particular Truck Inspection Service negotiation will take the admin to the negotiation-detail/:Truck Inspection ServiceNegotiationID.
7. The UI of the Truck Inspection Service negotiation detail page will follow the UI of the admin dashboard where it will render all the information of the respective Truck Inspection Service negotiation.
8. In the Truck Inspection Service negotiation detail page, the admin can change the status from the dropdown of advanceStatus and finalPaymentStatus.
9. After changing the statuses, the admin can hit the Update button to edit the changes.

      


2. in the routes folder, create the respective route file for basic info to manage its crud endpoints.