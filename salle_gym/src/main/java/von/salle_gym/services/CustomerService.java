package von.salle_gym.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import von.salle_gym.models.Customer;
import von.salle_gym.repositories.CustomerRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public List<Customer> searchCustomersByName(String lastName) {
        return customerRepository.findByLastNameContainingIgnoreCase(lastName);
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client non trouvé avec l'ID : " + id));
    }
    

    public Optional<Customer> updateCustomer(Long id, Customer customerDetails) {
        return customerRepository.findById(id).map(customer -> {
            if (customerDetails.getLastName() != null && !customerDetails.getLastName().isEmpty()) {
                customer.setLastName(customerDetails.getLastName());
            }
            
            if (customerDetails.getFirstName() != null && !customerDetails.getFirstName().isEmpty()) {
                customer.setFirstName(customerDetails.getFirstName());
            }
            
            if (customerDetails.getPhoneNumber() != null && !customerDetails.getPhoneNumber().isEmpty()) {
                customer.setPhoneNumber(customerDetails.getPhoneNumber());
            }
            
            if (customerDetails.getRegistrationDate() != null) {
                customer.setRegistrationDate(customerDetails.getRegistrationDate());
            }
            return customerRepository.save(customer);
        });
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
