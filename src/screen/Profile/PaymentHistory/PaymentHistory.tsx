import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import imageIndex from '../../../assets/imageIndex';
import CustomHeader from '../../../component/CustomHeader';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import { color, fonts, spacing, radius, shadows } from '../../../constant';

const { width } = Dimensions.get('window');

// Reusable gradient values
const buttLinearGradient =            color.buttLinearGradient
;

// Reusable Gradient Button
const GradientButton = ({ children, onPress, style, icon }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
    <LinearGradient
      colors={buttLinearGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientButton}
    >
      {icon && <Icon name={icon} size={16} color={color.white} style={{ marginRight: 6 }} />}
      <Text style={styles.gradientButtonText}>{children}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

// Payment Row Component
const PaymentRow = ({ item, index }) => {
  const statusStyle = [
    styles.statusBadge,
    item.status === 'Paid' ? styles.paid :
    item.status === 'Failed' ? styles.failed :
    item.status === 'Pending' ? styles.pending :
    item.status === 'Refunded' ? styles.refunded : styles.paid
  ];

  const statusIcon = item.status === 'Paid' ? 'check-circle' :
    item.status === 'Failed' ? 'x-circle' :
    item.status === 'Pending' ? 'clock' : 'refresh-ccw';

  const statusColor = item.status === 'Paid' ? color.success :
    item.status === 'Failed' ? color.error :
    item.status === 'Pending' ? color.warning : color.primary;

  return (
    <TouchableOpacity 
      style={[
        styles.rowContainer,
        index % 2 === 0 ? styles.evenRow : styles.oddRow
      ]} 
      activeOpacity={0.9}
    >
      <View style={styles.left}>
        <LinearGradient
               colors={color.buttLinearGradient}
 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.avatarPlaceholder}
        >
          <Icon 
            name={item.type === 'order' ? 'shopping-bag' : 
                  item.type === 'subscription' ? 'repeat' : 'credit-card'} 
            size={20} 
            color={color.white} 
          />
        </LinearGradient>
      </View>

      <View style={styles.center}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.dateContainer}>
          <Icon name="calendar" size={12} color={color.textMedium} />
          <Text style={styles.subtitle}>  {item.date} • {item.time}</Text>
        </View>
        <Text style={styles.paymentMethod}>
          <Icon name="credit-card" size={12} color={color.textMedium} />  {item.paymentMethod}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>{item.amount}</Text>
        <View style={statusStyle}>
          <Icon name={statusIcon} size={12} color={statusColor} />
          <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
        </View>
        {item.status === 'Failed' && (
          <TouchableOpacity style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Filter Modal Component
const FilterModal = ({ visible, onClose, onApply, selectedFilters }) => {
  const [filters, setFilters] = useState(selectedFilters);
  
  const filterOptions = [
    { id: 'all', label: 'All Payments' },
    { id: 'paid', label: 'Paid' },
    { id: 'failed', label: 'Failed' },
    { id: 'pending', label: 'Pending' },
    { id: 'refunded', label: 'Refunded' },
    { id: 'order', label: 'Orders' },
    { id: 'subscription', label: 'Subscriptions' },
  ];

  const toggleFilter = (filterId) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {};
    filterOptions.forEach(opt => {
      resetFilters[opt.id] = opt.id === 'all';
    });
    setFilters(resetFilters);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Payments</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={24} color={color.textMedium} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterOptions}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.filterOption,
                  filters[option.id] && styles.filterOptionSelected
                ]}
                onPress={() => toggleFilter(option.id)}
              >
                <View style={[
                  styles.filterCheckbox,
                  filters[option.id] && styles.filterCheckboxSelected
                ]}>
                  {filters[option.id] && (
                    <Icon name="check" size={12} color={color.white} />
                  )}
                </View>
                <Text style={[
                  styles.filterLabel,
                  filters[option.id] && styles.filterLabelSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Icon name="refresh-ccw" size={16} color={color.textMedium} />
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <GradientButton
              onPress={handleApply}
              style={styles.applyButton}
            >
              Apply Filters
            </GradientButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Date Range Modal
const DateRangeModal = ({ visible, onClose, onApply }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Date Range</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={24} color={color.textMedium} />
            </TouchableOpacity>
          </View>

          <View style={styles.dateInputContainer}>
            <View style={styles.dateInputWrapper}>
              <Icon name="calendar" size={20} color={color.secondary} style={styles.dateIcon} />
              <TextInput
                style={styles.dateInput}
                placeholder="Start Date (DD/MM/YYYY)"
                value={startDate}
                onChangeText={setStartDate}
              />
            </View>
            <Text style={styles.dateTo}>to</Text>
            <View style={styles.dateInputWrapper}>
              <Icon name="calendar" size={20} color={color.secondary} style={styles.dateIcon} />
              <TextInput
                style={styles.dateInput}
                placeholder="End Date (DD/MM/YYYY)"
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setStartDate('');
                setEndDate('');
              }}
            >
              <Icon name="x" size={16} color={color.textMedium} />
              <Text style={styles.resetButtonText}>Clear</Text>
            </TouchableOpacity>
            <GradientButton
              onPress={() => onApply(startDate, endDate)}
              style={styles.applyButton}
            >
              Apply Date Range
            </GradientButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const sampleData = [
  {
    id: '1',
    title: 'Order #A1234',
    date: 'Dec 08, 2025',
    time: '14:30 PM',
    amount: '₹1,299',
    status: 'Paid',
    paymentMethod: 'UPI',
    type: 'order'
  },
  {
    id: '2',
    title: 'Subscription - Pro',
    date: 'Nov 30, 2025',
    time: '10:15 AM',
    amount: '₹499',
    status: 'Paid',
    paymentMethod: 'Credit Card',
    type: 'subscription'
  },
  {
    id: '3',
    title: 'Order #A9876',
    date: 'Nov 20, 2025',
    time: '18:45 PM',
    amount: '₹2,199',
    status: 'Failed',
    paymentMethod: 'Net Banking',
    type: 'order'
  },
  {
    id: '4',
    title: 'Order #A5555',
    date: 'Oct 10, 2025',
    time: '11:20 AM',
    amount: '₹3,999',
    status: 'Paid',
    paymentMethod: 'Debit Card',
    type: 'order'
  },
  {
    id: '5',
    title: 'Order #B1234',
    date: 'Sep 28, 2025',
    time: '16:10 PM',
    amount: '₹1,599',
    status: 'Pending',
    paymentMethod: 'Wallet',
    type: 'order'
  },
  {
    id: '6',
    title: 'Subscription - Basic',
    date: 'Sep 15, 2025',
    time: '09:30 AM',
    amount: '₹299',
    status: 'Refunded',
    paymentMethod: 'Credit Card',
    type: 'subscription'
  },
  {
    id: '7',
    title: 'Order #C7890',
    date: 'Aug 22, 2025',
    time: '20:05 PM',
    amount: '₹4,299',
    status: 'Paid',
    paymentMethod: 'UPI',
    type: 'order'
  },
  {
    id: '8',
    title: 'Order #D4567',
    date: 'Jul 18, 2025',
    time: '13:45 PM',
    amount: '₹899',
    status: 'Failed',
    paymentMethod: 'Debit Card',
    type: 'order'
  },
];

export default function PaymentHistoryScreen() {
  const [selectedFilters, setSelectedFilters] = useState({
    all: true,
    paid: false,
    failed: false,
    pending: false,
    refunded: false,
    order: false,
    subscription: false
  });
  const [filteredData, setFilteredData] = useState(sampleData);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [activeSort, setActiveSort] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const applyFilters = (filters) => {
    setSelectedFilters(filters);
    
    let filtered = sampleData;
    
    // Apply status filters
    if (!filters.all) {
      const statusFilters = [];
      if (filters.paid) statusFilters.push('Paid');
      if (filters.failed) statusFilters.push('Failed');
      if (filters.pending) statusFilters.push('Pending');
      if (filters.refunded) statusFilters.push('Refunded');
      
      if (statusFilters.length > 0) {
        filtered = filtered.filter(item => statusFilters.includes(item.status));
      }
    }
    
    // Apply type filters
    if (filters.order || filters.subscription) {
      const typeFilters = [];
      if (filters.order) typeFilters.push('order');
      if (filters.subscription) typeFilters.push('subscription');
      
      if (typeFilters.length > 0) {
        filtered = filtered.filter(item => typeFilters.includes(item.type));
      }
    }
    
    // Apply search
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.amount.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (activeSort === 'recent') {
        return new Date(b.date) - new Date(a.date);
      } else if (activeSort === 'amount-high') {
        return parseFloat(b.amount.replace('₹', '').replace(',', '')) - 
               parseFloat(a.amount.replace('₹', '').replace(',', ''));
      } else if (activeSort === 'amount-low') {
        return parseFloat(a.amount.replace('₹', '').replace(',', '')) - 
               parseFloat(b.amount.replace('₹', '').replace(',', ''));
      }
      return 0;
    });
    
    setFilteredData(filtered);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    applyFilters({ ...selectedFilters });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.keys(selectedFilters).forEach(key => {
      if (key !== 'all' && selectedFilters[key]) count++;
    });
    return count;
  };

  const getTotalStats = () => {
    const paid = filteredData.filter(item => item.status === 'Paid');
    const totalPaid = paid.reduce((sum, item) => {
      const amount = parseFloat(item.amount.replace('₹', '').replace(',', ''));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    
    const pending = filteredData.filter(item => item.status === 'Pending');
    const totalPending = pending.reduce((sum, item) => {
      const amount = parseFloat(item.amount.replace('₹', '').replace(',', ''));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    
    return {
      totalTransactions: filteredData.length,
      totalPaid,
      totalPending
    };
  };

  const stats = getTotalStats();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <CustomHeader 
        label="Payment History" 
        leftPress={true}
        menuIcon={imageIndex.back}
      />
      
      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={color.textMedium} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search payments..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="x" size={20} color={color.textMedium} />
            </TouchableOpacity>
          )}
        </View>
      </View> */}

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <LinearGradient
          colors={color.buttLinearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.statsCard}
        >
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalTransactions}</Text>
            <Text style={styles.statLabel}>Transactions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>₹{stats.totalPaid.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Paid</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>₹{stats.totalPending.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <View style={styles.sortButtons}>
          {['recent', 'amount-high', 'amount-low'].map((sort) => (
            <TouchableOpacity
              key={sort}
              style={[
                styles.sortButton,
                activeSort === sort && styles.activeSortButton
              ]}
              onPress={() => {
                setActiveSort(sort);
                applyFilters(selectedFilters);
              }}
            >
              <Icon 
                name={sort === 'recent' ? 'calendar' : 
                      sort === 'amount-high' ? 'arrow-up' : 'arrow-down'} 
                size={16} 
                color={activeSort === sort ? color.white : color.textMedium} 
              />
              <Text style={[
                styles.sortButtonText,
                activeSort === sort && styles.activeSortButtonText
              ]}>
                {sort === 'recent' ? 'Recent' : 
                 sort === 'amount-high' ? 'High' : 'Low'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
     
      </View>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <View style={styles.activeFilters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.keys(selectedFilters).map(key => {
              if (key !== 'all' && selectedFilters[key]) {
                return (
                  <View key={key} style={styles.activeFilterTag}>
                    <Text style={styles.activeFilterText}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Text>
                    <TouchableOpacity onPress={() => {
                      const newFilters = { ...selectedFilters, [key]: false };
                      setSelectedFilters(newFilters);
                      applyFilters(newFilters);
                    }}>
                      <Icon name="x" size={12} color={color.white} />
                    </TouchableOpacity>
                  </View>
                );
              }
            })}
            <TouchableOpacity 
              style={styles.clearAllButton}
              onPress={() => {
                const resetFilters = { all: true };
                Object.keys(selectedFilters).forEach(key => {
                  if (key !== 'all') resetFilters[key] = false;
                });
                setSelectedFilters(resetFilters);
                applyFilters(resetFilters);
              }}
            >
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Payments List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="credit-card" size={80} color={color.borderLight} />
            <Text style={styles.emptyTitle}>No Payments Found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your filters or search terms
            </Text>
            <GradientButton
              onPress={() => {
                const resetFilters = { all: true };
                Object.keys(selectedFilters).forEach(key => {
                  if (key !== 'all') resetFilters[key] = false;
                });
                setSelectedFilters(resetFilters);
                applyFilters(resetFilters);
                setSearchQuery('');
              }}
              style={styles.emptyButton}
            >
              Clear Filters
            </GradientButton>
          </View>
        }
        renderItem={({ item, index }) => <PaymentRow item={item} index={index} />}
      />

      {/* Modals */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={applyFilters}
        selectedFilters={selectedFilters}
      />
      
      <DateRangeModal
        visible={showDateModal}
        onClose={() => setShowDateModal(false)}
        onApply={(start, end) => {
          // Implement date range filtering logic here
          setShowDateModal(false);
        }}
      />

      {/* Download Report Button */}
       
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color.background },
  
  // Search Bar
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: color.card,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.lightGray,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: color.textDark,
  },
  
  // Stats Cards
  statsContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  statsCard: {
    flexDirection: 'row',
    borderRadius: radius.md,
    ...shadows.lg,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: color.white,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: color.whiteAlpha90,
    fontFamily: fonts.medium,
  },
  statDivider: {
    width: 1,
    backgroundColor: color.whiteAlpha20,
    marginHorizontal: spacing.sm + 2,
  },
  
  // Filter Bar
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: color.card,
    borderBottomWidth: 1,
    borderBottomColor: color.borderLight,
  },
  sortButtons: {
    flexDirection: 'row',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    marginRight: spacing.sm + 2,
    backgroundColor: color.lightGray,
  },
  activeSortButton: {
    backgroundColor: color.primary,
  },
  sortButtonText: {
    fontSize: 14,
    color: color.textMedium,
    marginLeft: spacing.sm - 2,
    fontFamily: fonts.semiBold,
  },
  activeSortButtonText: {
    color: color.white,
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: color.lightGray,
    marginLeft: spacing.sm + 2,
    position: 'relative',
  },
  filterButtonText: {
    fontSize: 14,
    color: color.textMedium,
    marginLeft: spacing.sm - 2,
    fontFamily: fonts.semiBold,
  },
  filterBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: color.error,
    borderRadius: radius.md,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    fontSize: 10,
    color: color.white,
    fontFamily: fonts.bold,
  },
  
  // Active Filters
  activeFilters: {
    backgroundColor: color.card,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: color.borderLight,
  },
  activeFilterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm - 2,
    borderRadius: radius.md,
    marginRight: spacing.sm,
  },
  activeFilterText: {
    color: color.white,
    fontSize: 12,
    fontFamily: fonts.semiBold,
    marginRight: spacing.sm - 2,
  },
  clearAllButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm - 2,
    borderRadius: radius.md,
    backgroundColor: color.error,
  },
  clearAllText: {
    color: color.white,
    fontSize: 12,
    fontFamily: fonts.semiBold,
  },
  
  // List
  listContainer: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  
  // Payment Row
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.borderLight,
    ...shadows.card,
  },
  evenRow: {
    borderLeftWidth: 4,
    borderLeftColor: color.primary,
  },
  oddRow: {
    borderLeftWidth: 4,
    borderLeftColor: color.accent,
  },
  left: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: color.textDark,
    marginBottom: spacing.xs,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: color.textMedium,
  },
  paymentMethod: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: color.textMedium,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontFamily: fonts.extraBold,
    color: color.textDark,
    marginBottom: spacing.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: color.lightGray,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.bold,
    marginLeft: spacing.xs,
  },
  paid: {
    backgroundColor: color.successSoft,
  },
  failed: {
    backgroundColor: color.errorSoft,
  },
  pending: {
    backgroundColor: color.warningSoft,
  },
  refunded: {
    backgroundColor: color.primarySoft,
  },
  retryButton: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    backgroundColor: color.primary,
  },
  retryText: {
    color: color.white,
    fontSize: 11,
    fontFamily: fonts.semiBold,
  },
  
  // Empty State
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: spacing.xxxl + 8,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: color.textDark,
    marginTop: spacing.xl,
    marginBottom: spacing.sm + 2,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: color.textMedium,
    textAlign: 'center',
    marginBottom: spacing.xxxl - 2,
    lineHeight: 24,
  },
  emptyButton: {
    borderRadius: radius.md,
    overflow: 'hidden',
    ...shadows.md,
  },
  
  // Gradient Button
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.md,
  },
  gradientButtonText: {
    color: color.white,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  
  // Footer
  footer: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.lg,
    right: spacing.lg,
  },
  downloadButton: {
    borderRadius: radius.md,
    overflow: 'hidden',
    ...shadows.lg,
  },
  
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: color.overlayDark,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: color.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: color.borderLight,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: color.textDark,
  },
  closeButton: {
    padding: spacing.xs,
  },
  filterOptions: {
    padding: spacing.xl,
    maxHeight: 400,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: color.divider,
  },
  filterOptionSelected: {
    backgroundColor: color.primarySoft,
  },
  filterCheckbox: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: color.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  filterCheckboxSelected: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  filterLabel: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: color.textDark,
  },
  filterLabelSelected: {
    color: color.primary,
    fontFamily: fonts.semiBold,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: color.borderLight,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: color.lightGray,
    marginRight: spacing.md,
  },
  resetButtonText: {
    fontSize: 14,
    color: color.textMedium,
    fontFamily: fonts.semiBold,
    marginLeft: spacing.sm - 2,
  },
  applyButton: {
    flex: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  
  // Date Modal
  dateInputContainer: {
    padding: spacing.xl,
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.lightGray,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.borderLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  dateIcon: {
    marginRight: spacing.md,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: color.textDark,
  },
  dateTo: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.regular,
    color: color.textMedium,
    marginVertical: spacing.sm,
  },
});