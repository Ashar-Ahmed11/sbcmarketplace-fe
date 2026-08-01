[server](server/) this is an express server having the schemas in the models folder and its respective endpoints in the respective route files in the route folder.
[auth.js](server/routes/auth.js) this file contains the 2 endpoints for login and sign up which we need to wire it up in the frontend as follows:
1. create a login and sign up page whose ui is similar to the UI of the overall website.
2. In the login and sign up it shows 2 text inputs for email and password, and fires calls the createuser and login endpoint.
3. After successful login/signup store the authtoken in the local storage and navigate the user to the user dashboard.
   1. Make sure to use react toastify to indicate successful login toast and invalid credentials toast error.
4. Use the same user dashboard with the same structure as used in reference dashboard code [Admin-Panel-Workflow](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/referenceRepo/Admin-Panel-Workflow/) but the UI of the user dashboard should follow the UI of this figma design [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/bnvii6tYUyyFZzhhqrMv73/SBC-Marketplace-UI-1.0--Copy-?node-id=249-2641&t=hQfXXl8NWBN2D3bq-4).
   1. The User dashboard should only be accessible if the auth token is present in the localstorage, otherwise redirect the user back to the login page.
5. The user dashboard consists of the following tabs(which will also be visisble in the dashboard sidebar):
   1. Home (which consist of the KPIs, for now just show dummy kpis with dummy stats)
   2. My listings
      1. The My Listings page of the user dashboard renders all the listings which the user has created.
      2. In the top right of the my listings page, there should be a create new listing button which takes the user to the create listing page within the user dashboard.
      (the inputs for the create listing page are discussed below in the following prompt)
      
6. [admin.js](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/server/models/admin.js) this is the admin schema, so create an authentication route file similar to [auth.js](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/server/routes/auth.js) for the admin creation and login.
   1. On the frontend there should be only login admin page where the admin can login with the credentials and no sign up admin page, so create a admin document with the following credentials programatically:
      email: admin@sbcplace.com.
      password: Karachi2025@
7. In frontend, create a admin login page having a route as /admin, after successful authentication store the admin authetoken in the localstorage and navigate the user to the /admin-dashboard.
8. The UI and structure of the admin dashboard should also be similar to the user dashboard.
The admin dashboard should only be accessible if the auth token is present in the localstorage, otherwise redirect the admin to the /admin page.
9. The Admin Dashboard consist of the follow tabs:
    1. Home (for now show dummy kpi with dummy numbers)
    2. View Listings.
    3. Categories.

10. In the models folder create a new schema file for category, which consist of the following fields:
    1. name: String
    2. categoryType: enum (truck, machinery, material)
    2. Date: Date.now
then create the respective route file for this category schema in the routes folder and create its crud endpoints.
11. In the models folder create a new schema file for subCategory, which consist of the following fields:
    1. name: String
    2. Category: mongoose.Schema.Types.ObjectId, ref: category
    2. Date: Date.now
then create the respective route file for this subCategory schema in the routes folder and create its crud endpoints.

12. In the categories page of the admin dashboard it should render all the categories from the get-all-categories endpoint, also there should be a create category button at the top right corner of the page which takes the admin to the create category page having a category name input,categoryType dropdown(truck, machinery, material)  and create button which will fire the create category endpoint.
13. In the categories page of the admin dashboard where all categories are rendered, with each category there should be a View Subcategories and Edit button.
    1. The Edit Button of a sub category will take the admin to the /edit-category/:categoryID dynamic route/page whose UI should be same as create category page where you have to render the name of the selected category and instead of showing create button show these two buttons instead, Edit Category and Delete Category.
    2. If the Admin clicks on the delete category button then it should show a bootstrap confirmation modal, saying that are you sure you want to delete the category, and has a Delete button, if the user clicks on the delete button then it should fire the delete-category endpoint.
    3. The View Sub categories button will take the user to the /view-subcategories/:categoryID dynamic route which renders all the subcategories of the particular category by using the /get-subcategories/:categoryID endpoint of subcategory.
    4. In the view subcategories page there should be a Create Subcategory page which takes the admin to the /create-subcategory/:categoryID page whose UI is same as create category page and fires the create subcategory endpoint of the subcategory route.
    5. In the view subcategories page, with each subcategory there should be a edit button which takes the user to the /edit-subcategory/:subcategoryID page which behaves the same way as edit category.

14. In the models folder, create a schema for trucks which consist of the following fields:
    1. category: id ref(category)
    2. subcategory: id ref(subcategory)
    3. title: string
    4. description: string
    5. brand: string
    6. wheelType: number
    7. driveType: string
    9. capacity: {
        payloadCapacity: number,
        grossVehicleWeight: number,
        bodyCapacity: number,
        tankCapacity: number,
        drumCapactiy: number
    }
    10. engineTransmission:{
        engineBrand: string,
        engineModel: string,
        engineCapactiy: number
        engineHorsepower: number,
        torque: number,
        emissionStandard: string,
        fuelType: string,
        transmission: string, 
        driveType: string
    }
    11. dimensions :{
        length: number
        width: number
        height: number
        wheelBase: number
        groundClearance :number
    }
    12. tyres:{
        tyreSize: string, 
        numberOfTires: number,
        tyreCondition: number
    }
    13. body:{
        bodyType: string
        bodyMaterial: string
        chassisNumber: number
        cabinType: string enum(day, sleeper)
        steering: string enum(LHD/RHD)
    }

    14. usage:{
        mileage: number
        numberOfOwners: number
        registrationCity: string
        registrationStatus: enum (registered, unregistered)
    }
    15. originalDocuments: boolean,
    16. price
    17. images:[{url:string}]
    18. documentImages:[{url:string}]
    19. features:{
        ac:boolean, 
        powerSteering:boolean,
        abs: boolean, 
        differentialLock:boolean
        pto: boolean
        reverseCamera: boolean
        gpsTracker: boolean
        cruiseControl: boolean
    }
    20. manufacturingYear:number
    21. modelYear:number
    22. importYear: number
    23. location: string
    24. deliveryProvided: boolean,
    25. deliveryLocations: [{city:string,price:number}]


 
Note:
1. Make sure to place all the API calls in the [appState.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/context/appState.jsx) 
2. make sure to use javascript native fetch api.