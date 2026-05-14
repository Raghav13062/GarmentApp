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
    backgroundColor: '#fff',
  },
  bannerWrapper: {
    backgroundColor: '#fff',
    marginTop: 0,
    width: width,
    alignSelf: 'center',
  },
  promoBanner: {
    marginHorizontal: 16,
    height: 65,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  promoImage: {
    width: '100%',
    height: '100%',
  },
  gridSection: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '31%', 
    alignItems: 'center',
    marginBottom: 15,
  },
  gridImageContainer: {
    width: width * 0.28,
    height: width * 0.32,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    overflow: 'hidden',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridText: {
    fontSize: 11,
    color: '#333',
    fontFamily: fonts.semiBold,
    textAlign: 'center',
  },
  productSection: {
    backgroundColor: '#fff',
    paddingBottom: 15,
    marginTop: 5,
  },
  premiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 15,
    marginBottom: 12,
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#111',
    fontSize: 15,
    fontFamily: fonts.bold,
    letterSpacing: 0.3,
  },
  offerBadge: {
    backgroundColor: '#FF3F6C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginLeft: 8,
  },
  offerText: {
    color: '#fff',
    fontSize: 9,
    fontFamily: fonts.bold,
  },
  viewAll: {
    color: '#FF3F6C',
    fontSize: 12,
    fontFamily: fonts.bold,
  },
  sectionContainer: {
    marginTop: 10,
  },

  searchContainer: {
    backgroundColor: color.transparent,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginHorizontal: 10,
    padding: 0
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