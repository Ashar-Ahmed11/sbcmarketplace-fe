# Services Page
1. The user navigates to the services marketplace by clicking on the serivces from the navbar.
2. The UI of the services marketplace is same as Marketplace with the only difference that in the hero section instead of showing Trucks, Construction Machinery, construction material, Spare Parts, it will show Inspections, Repairs, Construction Services
# Construction Services
Now we are going to create the construction services, the mechanism and rest of the thigns are mostly same as the mechanism of truck from user listing to admin approval and marketplace rendering.
# Backend
1. In the models folder, create a schema for construction services which consist of the following fields:
   1. category: id ref(category)
   2. subcategory: [{id ref(subcategory)}]
   3. user: id ref(user)
   4. title: string
   5. description: string

6. companyType: string
7. yearsOfExperience: number
8. teamSize: number
  
9. images:[{url:string}]
10. certificationsImages:[{url:string}]
11. location: string
12. offerOnsiteService: boolean,
13. serviceAreas: [{city:string}]
14. approvalStatus: enum (pending, approved, rejected)
15. rejectionReason: string

2. create a route file for the respective construction services schema and create its crud endpoints.
# frontend
## User Dashboard
1. in the my listings page of the user dashboard, when the user clicks on the construction services, then it should navigate to the /my-listings/construction-services page whose ui and structure should be same as trucks page
   1. it should render all the construction services listings of the particular user.
   2. when we click on create button then it should take the user to the create construction services page which consist of the form(mostly same as trucks) as per the construction services schema.
      1. in the category dropdown, fetch and render the category whose categoryType is constructionServices.
         In the [category.js](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/server/models/category.js) a new value of constructionServices is added in the enum so wire all the other things associated with it.
         make sure to add construction services category type in create category page of the admin dashboard.
      2. similarly the subcategory should only be visible if the category contains subcategory.
         1. For the subcategory use the react-dropdown-select library for dropdown select so that the user can select multiple subcategories, select all etc as per the subcategory field of the construction services schema.
      3. for the company type there should be a dropdown consisting of the following options:
         - Main Contractor
         - Subcontractor
         - Consultant
         - Engineering Firm
         - Individual
      4. for the service areas also use the dropdown select so that the user can select one or multiple cities of Pakistan.
      5. for the rest of the fields use relevant inputs etc (make sure to follow create trucks page as most of the things resemble)
2. Similarly the edit constrcution services page and edit mechanism should be all the same as trucks.
## Admin Dashboard
1. Similarly when the admin clicks on the construction services in view listings page, then it should take the admin to the construction servicess page where admin can view all the construction services listings of all the users just like trucks and can change the status of a particular construction services listing by clicking on the view button which will take the admin to the view construction services listing page where the admin can view all the thigns of that particular listing and can change the status the same way as done for trucks.
## Marketplace
1. when the user clicks on construction services then it should fetch and render all the construction services listings of all the users whose status is approved.
2. when clicking on view detials button of a construction services listing then it will take the user to the /construction-services-details/:constructionservicesID dynamic route whose UI will be same as [TruckDetailsPage.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/TruckDetailsPage.jsx) but change the structure as per the different fields of the construction services schema.


# inspection services
Now we are going to create the inspection services, the mechanism and rest of the thigns are mostly same as the mechanism of truck from user listing to admin approval and marketplace rendering.
# Backend
1. In the models folder, create a schema for inspection services which consist of the following fields:
   1. category: [{id ref(category)}]
   3. user: id ref(user)
   4. title: string
   5. description: string

   6. yearsOfExperience: number
   7. teamSize: number
   
   8. images:[{url:string}]
   9. certificationsImages:[{url:string}]
   10. location: string
   11. offerOnsiteInspection: boolean,
   12. inspectionAreas: [{city:string}]
   13. approvalStatus: enum (pending, approved, rejected)
   14. rejectionReason: string

2. create a route file for the respective inspection services schema and create its crud endpoints.
# frontend
## User Dashboard
1. in the my listings page of the user dashboard, when the user clicks on the inspection services, then it should navigate to the /my-listings/inspection-services page whose ui and structure should be same as trucks page
   1. it should render all the inspection services listings of the particular user.
   2. when we click on create button then it should take the user to the create inspection services page which consist of the form(mostly same as trucks) as per the inspection services schema.
      1. in the category dropdown, fetch and render all the category whose categoryType is 'truck', 'machinery', 'material','spareParts'.
        1. For the category use the react-dropdown-select library for dropdown select so that the user can select one or multiple category, select all etc as per the category field of the inspection services schema.
     
      2. for the inspection areas also use the dropdown select so that the user can select one or multiple cities of Pakistan.
      3. for the rest of the fields use relevant inputs etc (make sure to follow create trucks page as most of the things resemble)
2. Similarly the edit inspection services page and edit mechanism should be all the same as trucks.
## Admin Dashboard
1. Similarly when the admin clicks on the inspection services in view listings page, then it should take the admin to the inspection servicess page where admin can view all the inspection services listings of all the users just like trucks and can change the status of a particular inspection services listing by clicking on the view button which will take the admin to the view inspection services listing page where the admin can view all the thigns of that particular listing and can change the status the same way as done for trucks.
## Marketplace
1. when the user clicks on inspection services then it should fetch and render all the inspection services listings of all the users whose status is approved.
2. when clicking on view detials button of a inspection services listing then it will take the user to the /inspection-services-details/:inspectionserviceID dynamic route whose UI will be same as [TruckDetailsPage.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/TruckDetailsPage.jsx) but change the structure as per the different fields of the inspection services schema.

# repair services
Now we are going to create the repair services, the mechanism and rest of the thigns are mostly same as the mechanism of truck from user listing to admin approval and marketplace rendering.
# Backend
1. In the models folder, create a schema for repair services which consist of the following fields:
   1. category: [{id ref(category)}]
   3. user: id ref(user)
   4. title: string
   5. description: string

   6. yearsOfExperience: number
   7. teamSize: number
   
   8. images:[{url:string}]
   9. certificationsImages:[{url:string}]
   10. location: string
   11. offerOnsiteRepair: boolean,
   12. repairAreas: [{city:string}]
   13. approvalStatus: enum (pending, approved, rejected)
   14. rejectionReason: string

2. create a route file for the respective repair services schema and create its crud endpoints.
# frontend
## User Dashboard
1. in the my listings page of the user dashboard, when the user clicks on the repair services, then it should navigate to the /my-listings/repair-services page whose ui and structure should be same as trucks page
   1. it should render all the repair services listings of the particular user.
   2. when we click on create button then it should take the user to the create repair services page which consist of the form(mostly same as trucks) as per the repair services schema.
      1. in the category dropdown, fetch and render all the category whose categoryType is 'truck', 'machinery', 'material','spareParts'.
        1. For the category use the react-dropdown-select library for dropdown select so that the user can select one or multiple category, select all etc as per the category field of the repair services schema.
     
      2. for the repair areas also use the dropdown select so that the user can select one or multiple cities of Pakistan.
      3. for the rest of the fields use relevant inputs etc (make sure to follow create trucks page as most of the things resemble)
2. Similarly the edit repair services page and edit mechanism should be all the same as trucks.
## Admin Dashboard
1. Similarly when the admin clicks on the repair services in view listings page, then it should take the admin to the repair servicess page where admin can view all the repair services listings of all the users just like trucks and can change the status of a particular repair services listing by clicking on the view button which will take the admin to the view repair services listing page where the admin can view all the thigns of that particular listing and can change the status the same way as done for trucks.
## Marketplace
1. when the user clicks on repair services then it should fetch and render all the repair services listings of all the users whose status is approved.
2. when clicking on view detials button of a repair services listing then it will take the user to the /repair-services-details/:repairServiceID dynamic route whose UI will be same as [TruckDetailsPage.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/TruckDetailsPage.jsx) but change the structure as per the different fields of the repair services schema.
