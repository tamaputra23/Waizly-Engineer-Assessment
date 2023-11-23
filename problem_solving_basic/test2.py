def calculate_ratios(arr):
    total_elements = len(arr)
    positive_count = sum(1 for num in arr if num > 0)
    negative_count = sum(1 for num in arr if num < 0)
    zero_count = sum(1 for num in arr if num == 0)

    positive_ratio = positive_count / total_elements
    negative_ratio = negative_count / total_elements
    zero_ratio = zero_count / total_elements

    # Print ratios with 6 decimal places
    print("{:.6f}".format(positive_ratio))
    print("{:.6f}".format(negative_ratio))
    print("{:.6f}".format(zero_ratio))

# Example usage
array_length = input()
array_value = input()
arr = list(map(int, array_value.split(' ')))
if len(arr) > int(array_length):
    print(f'given array is more than {array_length}')
else:
    calculate_ratios(arr)