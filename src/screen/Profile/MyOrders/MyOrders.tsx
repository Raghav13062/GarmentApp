import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  StatusBar,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../../constant";

const MyOrders = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Tab options with counts
  const tabs = [
    { id: "all", label: "All", icon: "package" },
    { id: "processing", label: "Processing", icon: "clock" },
    { id: "shipped", label: "Shipped", icon: "truck" },
    { id: "delivered", label: "Delivered", icon: "check-circle" },
    { id: "cancelled", label: "Cancelled", icon: "x-circle" },
    { id: "returned", label: "Returned", icon: "refresh-ccw" },
  ];

  // Sample order data with different statuses
  const sampleOrders = [
    {
      id: "ORD-001",
      date: "15 Dec 2023",
      items: [
        {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
          quantity: 1,
          price: 2999,
          status: "delivered",
        },
        {
          id: 2,
          name: "USB-C Charging Cable",
          image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
          quantity: 2,
          price: 499,
          status: "delivered",
        },
      ],
      total: 3997,
      status: "delivered",
      deliveryDate: "18 Dec 2023",
      address: "123 Main Street, New Delhi, 110001",
      paymentMethod: "Credit Card",
      trackingNumber: "TRK-789456123",
    },
    {
      id: "ORD-002",
      date: "20 Dec 2023",
      items: [
        {
          id: 3,
          name: "Smart Watch Series 5",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          quantity: 1,
          price: 12999,
          status: "processing",
        },
      ],
      total: 12999,
      status: "processing",
      deliveryDate: "25 Dec 2023",
      address: "456 Park Avenue, Mumbai, 400001",
      paymentMethod: "UPI",
      trackingNumber: "TRK-123456789",
    },
    {
      id: "ORD-003",
      date: "18 Dec 2023",
      items: [
        {
          id: 4,
          name: "Laptop Backpack",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
          quantity: 1,
          price: 1999,
          status: "shipped",
        },
        {
          id: 5,
          name: "Wireless Mouse",
          image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
          quantity: 1,
          price: 899,
          status: "shipped",
        },
      ],
      total: 2898,
      status: "shipped",
      deliveryDate: "22 Dec 2023",
      address: "789 MG Road, Bangalore, 560001",
      paymentMethod: "Debit Card",
      trackingNumber: "TRK-456789123",
    },
    {
      id: "ORD-004",
      date: "10 Dec 2023",
      items: [
        {
          id: 6,
          name: "Running Shoes",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          quantity: 1,
          price: 3599,
          status: "cancelled",
        },
      ],
      total: 3599,
      status: "cancelled",
      address: "321 Church Street, Chennai, 600001",
      paymentMethod: "Net Banking",
      trackingNumber: "TRK-789123456",
    },
    {
      id: "ORD-005",
      date: "05 Dec 2023",
      items: [
        {
          id: 7,
          name: "Winter Jacket",
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
          quantity: 1,
          price: 4599,
          status: "returned",
        },
      ],
      total: 4599,
      status: "returned",
      address: "654 Hill Road, Kolkata, 700001",
      paymentMethod: "Credit Card",
      trackingNumber: "TRK-321654987",
    },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [activeTab, orders]);

  const fetchOrders = () => {
    setLoading(true);
    // Simulate API call - In real app, fetch from Firebase
    setTimeout(() => {
      setOrders(sampleOrders);
      setLoading(false);
    }, 1000);
  };

  const filterOrders = () => {
    if (activeTab === "all") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => order.status === activeTab);
      setFilteredOrders(filtered);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "#FFA500";
      case "shipped":
        return "#4169E1";
      case "delivered":
        return "#4CAF50";
      case "cancelled":
        return "#FF6B6B";
      case "returned":
        return "#9C27B0";
      default:
        return "#666";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return "clock";
      case "shipped":
        return "truck";
      case "delivered":
        return "check-circle";
      case "cancelled":
        return "x-circle";
      case "returned":
        return "refresh-ccw";
      default:
        return "package";
    }
  };

  const getTabCount = (tabId) => {
    if (tabId === "all") return orders.length;
    return orders.filter(order => order.status === tabId).length;
  };

  const handleOrderAction = (orderId, action) => {
    Alert.alert(
      `Confirm ${action}`,
      `Are you sure you want to ${action} this order?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            // Handle the action
            Alert.alert("Success", `Order ${action}ed successfully`);
          },
        },
      ]
    );
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate("OrderDetails", { order: item })}
      activeOpacity={0.9}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}15` }]}>
          <Icon name={getStatusIcon(item.status)} size={14} color={getStatusColor(item.status)} />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      {item.items.slice(0, 2).map((product, index) => (
        <View key={index} style={styles.productItem}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
              {product.name}
            </Text>
            <Text style={styles.productQuantity}>Qty: {product.quantity}</Text>
            <Text style={styles.productPrice}>₹{product.price.toLocaleString()}</Text>
          </View>
        </View>
      ))}

      {item.items.length > 2 && (
        <Text style={styles.moreItems}>
          +{item.items.length - 2} more item{item.items.length - 2 > 1 ? 's' : ''}
        </Text>
      )}

      <View style={styles.orderFooter}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{item.total.toLocaleString()}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          {item.status === "processing" && (
            <>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => handleOrderAction(item.id, "cancel")}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.trackButton]}
                onPress={() => navigation.navigate("TrackOrder", { order: item })}
              >
                <Text style={styles.trackButtonText}>Track</Text>
              </TouchableOpacity>
            </>
          )}
          
          {item.status === "shipped" && (
            <TouchableOpacity
              style={[styles.actionButton, styles.trackButton]}
              onPress={() => navigation.navigate("TrackOrder", { order: item })}
            >
              <Icon name="map-pin" size={16} color="#4169E1" />
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>
          )}
          
          {item.status === "delivered" && (
            <>
              <TouchableOpacity
                style={[styles.actionButton, styles.reorderButton]}
                onPress={() => handleOrderAction(item.id, "reorder")}
              >
                <Icon name="repeat" size={16} color="#4CAF50" />
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.reviewButton]}
                onPress={() => navigation.navigate("WriteReview", { order: item })}
              >
                <Icon name="star" size={16} color="#FFA500" />
                <Text style={styles.reviewButtonText}>Review</Text>
              </TouchableOpacity>
            </>
          )}
          
          {item.status === "cancelled" && (
            <TouchableOpacity
              style={[styles.actionButton, styles.reorderButton]}
              onPress={() => handleOrderAction(item.id, "reorder")}
            >
              <Text style={styles.reorderButtonText}>Reorder</Text>
            </TouchableOpacity>
          )}
          
          {item.status === "returned" && (
            <TouchableOpacity
              style={[styles.actionButton, styles.helpButton]}
              onPress={() => navigation.navigate("HelpCenter")}
            >
              <Icon name="help-circle" size={16} color="#9C27B0" />
              <Text style={styles.helpButtonText}>Need Help?</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="package" size={80} color="#e0e0e0" />
      <Text style={styles.emptyTitle}>No Orders Found</Text>
      <Text style={styles.emptyText}>
        {activeTab === "all" 
          ? "You haven't placed any orders yet" 
          : `You don't have any ${activeTab} orders`}
      </Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation.navigate("Home")}
      >
        <LinearGradient
          colors={color.buttLinearGradient}
          style={styles.shopButtonGradient}
        >
          <Icon name="shopping-bag" size={20} color="#fff" />
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderTabBar = () => (
    <View style={styles.tabContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContent}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = getTabCount(tab.id);
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                isActive && styles.activeTabButton
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon 
                name={tab.icon} 
                size={16} 
                color={isActive ? "#fff" : "#666"} 
              />
              <Text style={[
                styles.tabText,
                isActive && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
              
              {count > 0 && (
                <View style={[
                  styles.tabBadge,
                  isActive && styles.activeTabBadge
                ]}>
                  <Text style={[
                    styles.tabBadgeText,
                    isActive && styles.activeTabBadgeText
                  ]}>
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
      
      {/* Header */}
      <LinearGradient
        colors={color.buttLinearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Orders</Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate("OrderFilter")}
          >
            <Icon name="filter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Order Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{orders.length}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              ₹{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {orders.filter(o => o.status === 'delivered').length}
            </Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tab Bar */}
      {renderTabBar()}

      {/* Orders List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F58021" />
          <Text style={styles.loadingText}>Loading your orders...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={color.buttLinearGradient}
             />
          }
          ListEmptyComponent={renderEmptyState}
          ListHeaderComponent={
            filteredOrders.length > 0 && (
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>
                  Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
                  {activeTab !== "all" && ` (${activeTab})`}
                </Text>
                <TouchableOpacity
                  style={styles.sortButton}
                  onPress={() => navigation.navigate("SortOrders")}
                >
                  <Icon name="calendar" size={18} color="#666" />
                  <Text style={styles.sortButtonText}>Recent</Text>
                  <Icon name="chevron-down" size={16} color="#666" />
                </TouchableOpacity>
              </View>
            )
          }
        />
      )}

      {/* Bottom Navigation */}
    
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  headerGradient: {
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  filterButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 10,
  },
  tabContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabContent: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  activeTabButton: {
    backgroundColor: '#F58021',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginHorizontal: 6,
  },
  activeTabText: {
    color: '#fff',
  },
  tabBadge: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: 'center',
  },
  activeTabBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666',
  },
  activeTabBadgeText: {
    color: '#fff',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 80,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  listHeaderText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  sortButtonText: {
    fontSize: 13,
    color: '#666',
    marginHorizontal: 6,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    textTransform: 'capitalize',
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
  },
  productQuantity: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F58021',
  },
  moreItems: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 15,
    textAlign: 'center',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  totalLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginLeft: 8,
    borderWidth: 1.5,
  },
  cancelButton: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  cancelButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  trackButton: {
    borderColor: '#4169E1',
    backgroundColor: '#F0F5FF',
  },
  trackButtonText: {
    color: '#4169E1',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  reorderButton: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0FFF4',
  },
  reorderButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  reviewButton: {
    borderColor: '#FFA500',
    backgroundColor: '#FFF9F0',
  },
  reviewButtonText: {
    color: '#FFA500',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  helpButton: {
    borderColor: '#9C27B0',
    backgroundColor: '#F9F0FF',
  },
  helpButtonText: {
    color: '#9C27B0',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  shopButton: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#F58021',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  shopButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  footerButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
});