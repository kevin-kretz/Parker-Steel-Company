import os, time, math
os.system("clear")
remaining_stock_len = None
cut_lens = []
cut_qtys_needed = []
all_possible_cuts = []
cuts_needed = {}
cuts_made = []

def set_cuts_needed():
    remaining_stock_len = int(input("What is the length of the stock (in inches)? "))
    num_of_cut_lengths = int(input("How many cut lengths are there? "))
    i = 1
    while i <= num_of_cut_lengths:
        tolerance = 0.125
        length = float(input("What is the length of cut " + str(i) + " (in inches)? "))
        qty = int(input("How many " + str(length) + " in. cuts are needed? "))
        cut_lens.append(length + tolerance)
        cut_qtys_needed.append(qty)
        i += 1
    cut_lens.append("R")
    j = 0
    while j < len(cut_qtys_needed):
        cuts_needed[cut_lens[j]] = cut_qtys_needed[j]
        j += 1
    return(remaining_stock_len)
        
def set_all_possible_cuts():
    previous_cut_qtys = get_first_cut(remaining_stock_len)
    another_cut_needed = get_another_cut_needed(previous_cut_qtys)
    while another_cut_needed:
        get_next_cut(previous_cut_qtys)
        another_cut_needed = get_another_cut_needed(previous_cut_qtys)

def get_first_cut(remaining_stock_len):
    cut_qtys = []
    k = 0
    while k < len(cut_lens):
        if k == len(cut_lens) - 1:
            cut_qtys.append(remaining_stock_len)
        else:
            qty = int(remaining_stock_len // cut_lens[k])
            cut_qtys.append(qty)
            remaining_stock_len -= cut_lens[k] * qty
        k += 1
    append_cut_to_array(cut_qtys)
    return(cut_qtys)
    
def get_another_cut_needed(previous_cut_qtys):
    m = 0
    while m < len(previous_cut_qtys) - 1:
        if previous_cut_qtys[m] > 0:
            return(True)
        m += 1
    return(False)

def get_next_cut(current_cut_qtys):
    cut_qtys, p = lower_the_smallest_digit_possible(current_cut_qtys)
    cut_qtys = increase_remaining_stock_len(cut_qtys, p)
    cut_qtys = use_remaining_stock_len(cut_qtys, p+1)
    append_cut_to_array(cut_qtys)
    
def append_cut_to_array(cut_qtys):
    n = 0
    possible_cut_option = {}
    while n < len(cut_qtys):
        possible_cut_option[cut_lens[n]] = cut_qtys[n]
        n += 1
    all_possible_cuts.append(possible_cut_option)
    
def get_best_cut(cuts_needed, all_possible_cuts):
    best_cut_index = get_best_cut_index(cuts_needed, all_possible_cuts)
    best_cut = all_possible_cuts[best_cut_index]
    return(best_cut)
    
def get_best_cut_index(cuts_needed, all_possible_cuts):
    n = 0
    cut_is_needed = True
    smallest_R_index = None
    smallest_R = remaining_stock_len
    while n < len(all_possible_cuts):
        cut_is_needed = get_cut_is_needed(cuts_needed, all_possible_cuts[n])
        if cut_is_needed:
            if all_possible_cuts[n]["R"] == 0:
                return n
            elif all_possible_cuts[n]["R"] < smallest_R:
                smallest_R = all_possible_cuts[n]["R"]
                smallest_R_index = n
        n += 1
    return(smallest_R_index)

def lower_the_smallest_digit_possible(current_cut_qtys):
    p = len(current_cut_qtys) - 2
    while p >= 0:
        if current_cut_qtys[p] > 0:
            current_cut_qtys[p] -= 1
            break
        p -= 1
    return(current_cut_qtys, p)

def increase_remaining_stock_len(cut_qtys, p):
    cut_qtys[-1] += cut_lens[p]
    return(cut_qtys)

def use_remaining_stock_len(cut_qtys, p):
    if cut_qtys[-1] > 0:
        while p < len(cut_qtys) - 1:
            if cut_qtys[-1] > cut_qtys[p]:
                qty = int(cut_qtys[-1] // cut_lens[p])
                cut_qtys[p] += qty
                cut_qtys[-1] -= cut_lens[p] * qty
                cut_qtys[-1] = round(cut_qtys[-1], 3)
            p += 1
    return(cut_qtys) 

def update_cuts_needed(cuts_needed, best_cut):
    updated_cuts_needed = {key: cuts_needed[key] - best_cut.get(key, 0) for key in cuts_needed.keys()}
    return(updated_cuts_needed)

def get_cut_is_needed(cuts_needed, possible_cut):
    cuts_needed_after_possible_cut = {key: cuts_needed[key] - possible_cut.get(key, 0) for key in cuts_needed.keys()}
    for key, value in cuts_needed_after_possible_cut.items():
        if value < 0:
            return(False)
    return(True)    
    
def make_all_cuts(cuts_needed, best_cut, all_possible_cuts):
    needs_another_cut = get_needs_another_cut(cuts_needed)
    while needs_another_cut:
        best_cut = get_best_cut(cuts_needed, all_possible_cuts)
        cuts_needed = make_cut(cuts_needed, best_cut)
        needs_another_cut = get_needs_another_cut(cuts_needed)    
    
def get_needs_another_cut(cuts_needed):
    all_qtys_equal_zero = all(qty == 0 for qty in cuts_needed.values())
    return (not all_qtys_equal_zero)    
    
def make_cut(cuts_needed, best_cut):
    new_cuts_needed = update_cuts_needed(cuts_needed, best_cut)
    cuts_made.append(best_cut)
    return new_cuts_needed    

def print_summary(cuts_made):
    q = 0
    cutting_styles = {}
    remaining_stock_len_in_feet = math.ceil(remaining_stock_len / 12)
    last_bar_length = math.ceil(remaining_stock_len - cuts_made[-1]["R"])
    print("\n*** Purchasing instructions: ***")
    if len(cuts_made) - 1 > 0: 
        print(str(len(cuts_made) - 1) + " x " + str(remaining_stock_len_in_feet) + " ft. bars")
    print("1 x " + str(last_bar_length) + " in. bar")
    print("\n*** Cutting instructions: ***")
    if len(cuts_made) - 1 > 0:
        print(str(remaining_stock_len_in_feet) + " ft. bars:")
    while q < len(cuts_made) - 1:
        temp_string = ""
        no_zero_dict = {key:value for key, value in cuts_made[q].items() if value}
        no_R_dict = {key:value for key, value in no_zero_dict.items() if key != "R"}
        length = list(no_R_dict.keys())
        qty = list(no_R_dict.values())
        s = 0
        while s < len(length):
            if s == len(length) - 1 and s == 0:
                temp_string += str(length[s]) + "\" x " + str(qty[s])
            elif s == 0:
                temp_string += str(length[s]) + "\" x " + str(qty[s]) + ",  "
            elif s == len(length) - 1:
                temp_string += str(length[s]) + "\" x " + str(qty[s])
            else:
                temp_string += str(length[s]) + "\" x " + str(qty[s]) + ",  "
            s += 1
        if temp_string not in cutting_styles.keys():
            cutting_styles[temp_string] = 1
        else:
            cutting_styles[temp_string] += 1
        q += 1
    cutting_style_lengths = [value for value in cutting_styles.keys()]
    cutting_style_qtys = [int(value) for value in cutting_styles.values()]
    t = 0
    bar_number = 1
    while t < len(cutting_style_lengths):
        if cutting_style_qtys[t] > 1:
            print("Bars " + str(bar_number) + " - " + str(cutting_style_qtys[t] + bar_number - 1) + ":  " + str(cutting_style_lengths[t]))
        else:
            print("Bar " + str(bar_number) + ":  " +  str(cutting_style_lengths[t]))
        bar_number += cutting_style_qtys[t]
        t += 1
    print("\n" + str(last_bar_length) + " in. bar:")
    if "R" in cuts_made[q]:
        del cuts_made[q]["R"]
    no_zero_dict_last_bar = {key:value for key, value in cuts_made[q].items() if value}
    length = list(no_zero_dict_last_bar.keys())
    qty = list(no_zero_dict_last_bar.values())
    print("Bar 1:  " + str(length[0]) + "\" x " + str(qty[0]) + "\n")

remaining_stock_len = set_cuts_needed()
set_all_possible_cuts()
best_cut = get_best_cut(cuts_needed, all_possible_cuts)
make_all_cuts(cuts_needed, best_cut, all_possible_cuts)
print_summary(cuts_made)

run_again = input("Would you like to enter another order? (Type \"Y\" for yes, or \"N\" for no.) ").upper()
if run_again == "Y":
    os.system("python3 start")
else:
    time.sleep(3)
    os.system("exit")
