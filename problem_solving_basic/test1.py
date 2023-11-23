def min_max_sum(arr):
    total_sum = sum(arr)
    min_value = total_sum - max(arr)
    max_value = total_sum - min(arr)
    return min_value, max_value

# Example usage
array_value = input()
arr = list(map(int, array_value.split(' ')))
if len(arr) > 5:
    print(f'given array is more than 5')
else:
    min_value, max_value = min_max_sum(arr)
    print(min_value, max_value)