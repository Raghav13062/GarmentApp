import { StyleSheet, Dimensions, Platform } from 'react-native';
import { color, fonts } from '../../../constant';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: color.white
  },
    container1: {
    padding: 12,
    backgroundColor: "#F6F6F6",
    flex: 1,
  },
  emptyContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 20,
},
emptyText: {
  color: '#9f9f9fff',
  fontSize: 14,
},
loaderContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
sectionHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 12,
  marginTop: 10,
  marginBottom:18
},
sectionTitle: {
  color: 'black',
  fontSize: 15,
  fontWeight: '600',
},
viewAll: {
  color: 'black',
  fontSize: 14,
  fontWeight: '500',
},
sectionContainer: {
  marginHorizontal: 12,
  marginTop: 10,
},

  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginHorizontal: 10,
    padding: 0
  },
  genderTab: {
  paddingVertical: 6,
  paddingHorizontal: 14,
  borderRadius: 16,
  backgroundColor: "#F1F1F1",
  marginHorizontal: 5,
  marginTop:5 ,
  marginBottom:5
},

genderActiveTab: {
  backgroundColor: "#000",
},

genderText: {
  fontSize: 12,
  fontWeight: "600",
  color: "#000",
},

genderActiveText: {
  color: "#FFF",
},

  searchInputContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  flatListContent: {
    marginLeft: 20,
  }

 });