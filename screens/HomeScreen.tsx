import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useExpenseStore, useTotalExpenses, Expense } from '../store/useExpenseStore';
import ExpenseItem from '../components/ExpenseItem';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const expenses = useExpenseStore((state) => state.expenses);
  const addExpense = useExpenseStore((state) => state.addExpense);
  const removeExpense = useExpenseStore((state) => state.removeExpense);
  
  const totalExpenses = useTotalExpenses();

  const handleAddExpense = () => {
    setError('');

    if (title.trim() === '') {
      setError('Please enter a title');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parsedAmount,
    };

    addExpense(newExpense);
    setTitle('');
    setAmount('');
  };

  const handleDeleteExpense = (id: string) => {
    removeExpense(id);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
             <Text style={styles.appTitle}>💰 Pennywise</Text>
             <Text style={styles.appSubtitle}>Track your expenses</Text>
          </View>
          <Pressable 
            style={({ pressed }) => [
              styles.galleryButton,
              pressed && styles.galleryButtonPressed
            ]}
            onPress={() => navigation.navigate('Gallery')}
          >
             <Text style={styles.galleryButtonText}>Gallery ➜</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Expenses</Text>
        <Text style={styles.totalAmount}>₹{totalExpenses.toFixed(2)}</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="What did you spend on?"
          placeholderTextColor="#9ca3af"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount (₹)"
          placeholderTextColor="#9ca3af"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
        
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={handleAddExpense}
        >
          <Text style={styles.addButtonText}>+ Add Expense</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Recent Expenses</Text>
        {expenses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No expenses yet</Text>
            <Text style={styles.emptySubtext}>Add your first expense above!</Text>
          </View>
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExpenseItem expense={item} onDelete={handleDeleteExpense} />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  header: {
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  galleryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  galleryButtonPressed: {
    backgroundColor: '#2563eb',
  },
  galleryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  totalCard: {
    backgroundColor: '#46d0e5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 14,
    color: '#c7d2fe',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  form: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 4,
  },
  addButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  addButtonPressed: {
    backgroundColor: '#059669',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
});
