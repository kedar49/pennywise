import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Expense } from '../store/useExpenseStore';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
  return (
    <View style={styles.card}>

      <View style={styles.details}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.amount}>₹{expense.amount.toFixed(2)}</Text>
      </View>
      

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
        onPress={() => onDelete(expense.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    color: '#6b7280',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    padding: 8,
    marginLeft: 12,
  },
  deleteButtonPressed: {
    backgroundColor: '#fecaca',
  },
  deleteText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ExpenseItem;
