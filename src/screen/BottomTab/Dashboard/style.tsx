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
  bannerWrapper: {
    backgroundColor: '#fff',
    marginTop: 4,
  },
  promoBanner: {
    marginHorizontal: 16,
    height: 85,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#fefefe',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
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
    width: '23%', 
    alignItems: 'center',
    marginBottom: 20,
  },
  gridImageContainer: {
    width: width * 0.18,
    height: width * 0.22,
    borderRadius: 12,
    backgroundColor: '#FFF0F3',
    overflow: 'hidden',
    marginBottom: 6,
    borderWidth: 0.5,
    borderColor: '#f0f0f0',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridText: {
    fontSize: 10.5,
    color: '#333',
    fontFamily: fonts.semiBold,
    textAlign: 'center',
  },
  productSection: {
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  premiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#111',
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  offerBadge: {
    backgroundColor: '#fff1f4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: '#ff3f6c',
  },
  offerText: {
    color: '#ff3f6c',
    fontSize: 10,
    fontFamily: fonts.bold,
  },
  viewAll: {
    color: '#888',
    fontSize: 12,
    fontFamily: fonts.semiBold,
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