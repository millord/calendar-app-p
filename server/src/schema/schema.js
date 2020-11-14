const graphql = require('graphql');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

const { GraphQLObjectType, 
  GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;


  const  {
    GraphQLDate,
  }  = require( 'graphql-iso-date');
   


// dummy data
var calendarEventData = [
  { id: '1',name: 'Sons Birthday', description: 'Celebrate', date: new Date()  },
  { id: '2',name: 'Go shopping', description: 'Go shopping to the mall', date: new Date()  },

];

const CalendarEventType = new GraphQLObjectType({
  name: 'Event',
  fields: ( ) => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      // date: { type: GraphQLDate }
      date: { type: GraphQLString }
      
  })
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        calendarEvent: {
            type: CalendarEventType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
              return calendarEventData.find(calendarEvent => calendarEvent.id === args.id)
            }
        },
        calendarEvents: {
          type: new GraphQLList(CalendarEventType),
          resolve(parent, args){
            return calendarEventData;
          }
      },
        
        
    }
});


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    addCalenderEvent: {
      type: CalendarEventType,
      args:{
        name:{type: new GraphQLNonNull(GraphQLString)},
        description: {type:  new GraphQLNonNull(GraphQLString)},
        // date: { type: GraphQLDate }
        date:{type: new GraphQLNonNull(GraphQLString)}
      
      },
      resolve(parent, args){
        args.id = uuidv4()
        //args.date = new Date()
        // let newEventdata = calendarEventData.concat([args])
        calendarEventData.push(args)
        console.log(calendarEventData)
        return;
        
      }
    },
    removeCalendarEvent: {
      type: CalendarEventType,
      args:{
        id: { type: GraphQLID }
      
      },
      resolve(parent, args){
        const newEventData = calendarEventData.filter(calendarEvent => calendarEvent.id !== args.id)
        console.log(newEventData)
        return 
      }
    },
    updateCalendarEvent: {
      type: CalendarEventType,
      args:{
        id: { type: GraphQLID },
        name:{type: new GraphQLNonNull(GraphQLString)},
        description: {type:  new GraphQLNonNull(GraphQLString)},
      
      },
      resolve(parent, args){
       calendarEventData.map(calendarEvent => {
         if(calendarEvent.id === args.id){
          calendarEvent['name'] = args.name
          calendarEvent['description'] = args.description
         }
         
       })
       console.log("Updated Data",calendarEventData)
     
      }
      
    }
   
  }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});