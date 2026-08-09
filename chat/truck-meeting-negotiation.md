# Truck Meeting Negotiation
Now we are going to create truck meeting negotiation, whose mechanism, structure, UI and most of the things will be similar to the truck negotiation system.
But it should be treated seperataly and should have its own modular components instead of reusing the components of the truck negotitation
## Backend
1. in the models folder create a new schema for truck meeting which consist of the following fields:
   1. buyer: id ref(user)
   2. seller: id ref(user)
   3. truck: id ref(truck)
   
   7. negotiation:[{
      negotiator:string enum('buyer','seller')
      meetingDate:Date
      meetingTime:number
      location:string
      accepted:boolean default false
      }]
   8. status: enum('pending','under approval','scheduled approved','successful') default pending
   9. meetingSuccessfulDate : Date
   10. dateOfCreation: Date default(date.now)
2. in the routes folder, create the respective route file for truckMeeting to manage its crud endpoints.
## User Dashboard
1. In the user dashboard, add a new tab of My Meetings in the sidebar which takes the user to the My Meetings page of the user dashboard.
2. the ui of the my meetings page is similar to the ui of the My Listings page.
3. clicking on the truck meetings will take the user to the trucks-meeting page whose ui is similar to trucks listing page.
In the trucks meeting page it will fetch and show all the meetings whose buyer or seller field matches the logged in user id.
4. Clicking on the view button will take the user to the /truck-meeting/:truckmeetingID dynamic route which is described below in next point.



## Trucks Meeting Details Page
1. [TruckDetailsSidebarCards.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/TruckDetailsSidebarCards.jsx) when clicking on the Request For Meeting button then it will open a bootstrap modal for Request For Meeting which will ask for the following things from the buyer as per the truckMeeting schema:
    1. Meeting Date using react date picker
    2. Meeting Time using react-time-picker library
    3. loaction as text
These are the information which will be used for creating the first negotiation object at the time of the truck meeting creation.

2. Clicking on the request button of the Request For Meeting modal will create the meeting document by firing the create-meeting endpoint and on successful creation will navigate the user to the truck-meeting-detail/:truckmeetingID of the user dashboard the same way as it is done for truck negotiation when it is created.
3. The UI of the Truck Meeting Details page will also be similar to the UI of the truck negotiation details page.
3. Instead of costs, the user will negotiate on the basis of meetingDate, meetingTime and location
4. Once the offer is accepted by either the buyer or seller then the particular meeting negotiation object will be marked as accepted and the status will be changed from pending to pending approval.
5. when a meeting status is pending approval then it will show a section of Under Admin Approval.
6. Once the meeting status has been changed to scheduled approved by the admin then it will show a section of Scheduled approved at date, time and location.
And render the accepted date time and location in the section.

## Admin Dashboard
1. In the admin dashboard, add a new tab of View Meetings in the sidebar which takes the admin to the View Negotitions page of the admin dashboard.
2. The UI of the Meetings page should be similar to the Ui of View listings, when the Admin clicks on the Trucks Negotiation then it should navigate the admin to the truck-neogtiations page.
3. The UI of Truck Meetings page is also similar to Trucks Lisitng page whcih will render all the negotiations of all the Users.
4. Clicking on the view button of a particular truck meeting will take the admin to the truck-meeting-detail/:truckmeetingID.
5. The UI of the truck meeting detail page will follow the UI of the admin dashboard where it will render all the information of the respective truck meeting.
6. In the truck meeting detail page, the admin can change the status from the dropdown of status as per the status field of the truckMeeting schema
7. After changing the statuses, the admin can hit the Update button to edit the changes and the meetingSuccessfulDate will also be assigned with the current date.
