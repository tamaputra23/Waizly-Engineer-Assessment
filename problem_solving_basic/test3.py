def time_conversion(s):
    # Extract components from the input string
    hour, minute, second_ampm = map(int, s[:-2].split(':'))
    ampm = s[-2:]

    # Convert to military time
    if ampm == 'PM' and hour != 12:
        hour += 12
    elif ampm == 'AM' and hour == 12:
        hour = 0

    # Format the result
    military_time = "{:02d}:{:02d}:{:02d}".format(hour, minute, second_ampm)
    return military_time


time_12hr = input()
result = time_conversion(time_12hr)
print(result)
