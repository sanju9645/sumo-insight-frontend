import { useState, useEffect } from "react";
import { toast } from "sonner";

interface AlertConfigurationSectionProps {
  endpointArray: string[];
  onConfigChange?: (config: AlertConfiguration, isValid: boolean) => void;
  initialAlertConfig?: AlertConfiguration;
}

export interface AlertCondition {
  api: string;
  metricType: string;
  operator: string;
  thresholdValue: string;
  alertPriority: string;
  alertType: string;
}

export interface AlertConfiguration {
  emails: string[];
  phoneNumbers: string[];
  conditions: AlertCondition[];
}

const AlertConfigurationSection = ({ 
  endpointArray, 
  onConfigChange, 
  initialAlertConfig 
}: AlertConfigurationSectionProps) => {
  const [alertEmails, setAlertEmails] = useState<string[]>(initialAlertConfig?.emails || []);
  const [emailInput, setEmailInput] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(initialAlertConfig?.phoneNumbers || []);
  const [phoneInput, setPhoneInput] = useState('');
  
  // Initialize conditions from props if available
  const [alertConditions, setAlertConditions] = useState<AlertCondition[]>(
    initialAlertConfig?.conditions || []
  );
  
  // Form is valid by default when there are no conditions
  const [isValid, setIsValid] = useState<boolean>(true);

  // Update component state when initialAlertConfig changes (e.g., after data loads)
  useEffect(() => {
    if (initialAlertConfig) {
      setAlertEmails(initialAlertConfig.emails || []);
      setPhoneNumbers(initialAlertConfig.phoneNumbers || []);
      setAlertConditions(initialAlertConfig.conditions || []);
    }
  }, [initialAlertConfig]);

  // Validate whenever conditions change
  useEffect(() => {
    validateConfigurations();
  }, [alertEmails, phoneNumbers, alertConditions]);

  const validateConfigurations = () => {
    // Filter out conditions with empty API values
    const validConditions = alertConditions.filter(condition => condition.api);
    
    // If no conditions exist, form is valid
    if (alertConditions.length === 0) {
      setIsValid(true);
      if (onConfigChange) {
        onConfigChange({
          emails: alertEmails,
          phoneNumbers: phoneNumbers,
          conditions: validConditions.map(condition => ({...condition}))
        }, true);
      }
      return;
    }

    // Check for empty required fields
    const hasEmptyFields = alertConditions.some(condition => 
      !condition.api || !condition.thresholdValue
    );
    
    if (hasEmptyFields) {
      setIsValid(false);
      if (onConfigChange) {
        onConfigChange({
          emails: alertEmails,
          phoneNumbers: phoneNumbers,
          conditions: validConditions.map(condition => ({...condition}))
        }, false);
      }
      return;
    }

    // Check for duplicate conditions
    const duplicateFound = hasDuplicateConditions();
    if (duplicateFound) {
      toast.error("Duplicate alert conditions found. Please ensure all conditions are unique.");
      setIsValid(false);
      if (onConfigChange) {
        onConfigChange({
          emails: alertEmails,
          phoneNumbers: phoneNumbers,
          conditions: validConditions.map(condition => ({...condition}))
        }, false);
      }
      return;
    }

    // If we got here, the configuration is valid
    setIsValid(true);
    if (onConfigChange) {
      onConfigChange({
        emails: alertEmails,
        phoneNumbers: phoneNumbers,
        conditions: validConditions.map(condition => ({...condition}))
      }, true);
    }
  };

  const hasDuplicateConditions = () => {
    for (let i = 0; i < alertConditions.length; i++) {
      for (let j = i + 1; j < alertConditions.length; j++) {
        if (
          alertConditions[i].api === alertConditions[j].api &&
          alertConditions[i].metricType === alertConditions[j].metricType &&
          alertConditions[i].operator === alertConditions[j].operator &&
          alertConditions[i].thresholdValue === alertConditions[j].thresholdValue &&
          alertConditions[i].alertPriority === alertConditions[j].alertPriority
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const addEmail = (email: string) => {
    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!email) return;
    
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!alertEmails.includes(email)) {
      const updatedEmails = [...alertEmails, email];
      setAlertEmails(updatedEmails);
      validateConfigurations();
    }
  };

  const removeEmail = (index: number) => {
    const updatedEmails = alertEmails.filter((_, i) => i !== index);
    setAlertEmails(updatedEmails);
    validateConfigurations();
  };

  const addPhone = (phone: string) => {
    // Phone number validation regex - allows + and digits
    const phoneRegex = /^\+?[0-9]{8,15}$/;
    
    if (!phone) return;
    
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number with country code (e.g., +1234567890)");
      return;
    }
    
    if (!phoneNumbers.includes(phone)) {
      const updatedPhones = [...phoneNumbers, phone];
      setPhoneNumbers(updatedPhones);
      validateConfigurations();
    }
  };

  const removePhone = (index: number) => {
    const updatedPhones = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(updatedPhones);
    validateConfigurations();
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && emailInput) {
      e.preventDefault();
      addEmail(emailInput);
      setEmailInput('');
    }
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && phoneInput) {
      e.preventDefault();
      addPhone(phoneInput);
      setPhoneInput('');
    }
  };

  const updateCondition = (index: number, field: keyof AlertCondition, value: string) => {
    const updatedConditions = alertConditions.map((condition, i) => {
      if (i === index) {
        return { ...condition, [field]: value };
      }
      return condition;
    });
    
    setAlertConditions(updatedConditions);
    validateConfigurations();
  };

  const addCondition = () => {
    const newConditions = [
      ...alertConditions, 
      {
        api: '',
        metricType: 'PTime',
        operator: '>',
        thresholdValue: '',
        alertPriority: 'moderate',
        alertType: 'email'
      }
    ];
    setAlertConditions(newConditions);
  };

  const removeCondition = (index: number) => {
    // Remove the condition at the specified index without any restrictions
    const updatedConditions = alertConditions.filter((_, i) => i !== index);
    setAlertConditions(updatedConditions);
  };

  return (
    <div className="mt-8 p-4 border rounded-lg dark:border-gray-700">
      <h2 className="text-lg font-bold">Alert Configuration</h2>
      
      {/* Email Alert Row */}
      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">Alert Emails:</label>
        <div className="flex flex-wrap items-center gap-2 p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600">
          {alertEmails.map((email, index) => (
            <div key={index} className="flex items-center bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
              <span>{email}</span>
              <button 
                type="button" 
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                onClick={() => removeEmail(index)}
              >
                ×
              </button>
            </div>
          ))}
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyDown={handleEmailKeyDown}
            placeholder="Enter email and press Enter"
            className="flex-grow outline-none bg-transparent"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Type a single email address and press Enter to add it to the list.</p>
      </div>
      
      {/* Phone Numbers Row */}
      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">Alert Phone Numbers:</label>
        <div className="flex flex-wrap items-center gap-2 p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600">
          {phoneNumbers.map((phone, index) => (
            <div key={index} className="flex items-center bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
              <span>{phone}</span>
              <button 
                type="button" 
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                onClick={() => removePhone(index)}
              >
                ×
              </button>
            </div>
          ))}
          <input
            type="tel"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            onKeyDown={handlePhoneKeyDown}
            placeholder="Enter phone number and press Enter"
            className="flex-grow outline-none bg-transparent"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Type a single phone number with country code (e.g., +1234567890) and press Enter to add it to the list.</p>
      </div>
      
      {/* Alert Conditions Section */}
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium">Alert Conditions:</label>
          <button 
            type="button" 
            onClick={addCondition}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            + Add Condition
          </button>
        </div>
        
        {alertConditions.length === 0 && (
          <div className="mt-3 p-3 border rounded-md border-dashed dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-center text-gray-500">
            No alert conditions configured. Click "Add Condition" to create one.
          </div>
        )}
        
        {alertConditions.map((condition, index) => (
          <div key={index} className="mt-3 p-3 border rounded-md dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col md:flex-row gap-2 mb-2">
              {/* API Dropdown - wider */}
              <div className="w-full md:flex-[2] mb-2 md:mb-0">
                <label className="block text-xs font-medium mb-1">API</label>
                <select
                  value={condition.api}
                  onChange={(e) => updateCondition(index, 'api', e.target.value)}
                  className="w-full p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  required
                >
                  <option value="">Select API</option>
                  <option value="all">all</option>
                  {endpointArray.map((endpoint, i) => (
                    <option key={i} value={endpoint}>{endpoint}</option>
                  ))}
                </select>
              </div>
              
              {/* Metric Type Dropdown - standard width */}
              <div className="w-full md:flex-1 mb-2 md:mb-0">
                <label className="block text-xs font-medium mb-1">Metric</label>
                <select
                  value={condition.metricType}
                  onChange={(e) => updateCondition(index, 'metricType', e.target.value)}
                  className="w-full p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  required
                >
                  <option value="avg_p_time">PTime</option>
                  <option value="count">Count</option>
                </select>
              </div>
              
              {/* Operator Dropdown - wider */}
              <div className="w-full md:flex-[1.5] mb-2 md:mb-0">
                <label className="block text-xs font-medium mb-1">Condition</label>
                <select
                  value={condition.operator}
                  onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                  className="w-full p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  required
                >
                  <option value="=">Equal to</option>
                  <option value=">">Greater than</option>
                  <option value="<">Less than</option>
                  <option value=">=">Greater than or equal to</option>
                  <option value="<=">Less than or equal to</option>
                </select>
              </div>
              
              {/* Threshold Value Input - narrower */}
              <div className="w-full md:flex-[0.8] mb-2 md:mb-0">
                <label className="block text-xs font-medium mb-1">Threshold</label>
                <input
                  type="number"
                  value={condition.thresholdValue}
                  onChange={(e) => updateCondition(index, 'thresholdValue', e.target.value)}
                  placeholder="Value"
                  className="w-full p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              
              {/* Priority Dropdown - narrower */}
              <div className="w-full md:flex-[0.8] mb-2 md:mb-0">
                <label className="block text-xs font-medium mb-1">Priority</label>
                <select
                  value={condition.alertPriority}
                  onChange={(e) => updateCondition(index, 'alertPriority', e.target.value)}
                  className="w-full p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  required
                >
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="highest">Highest</option>
                </select>
              </div>
              
              {/* Alert Type Dropdown - narrower */}
              <div className="w-full md:flex-[0.8] mb-2 md:mb-0">
                <label className="block text-xs font-medium mb-1">Alert Via</label>
                <select
                  value={condition.alertType}
                  onChange={(e) => updateCondition(index, 'alertType', e.target.value)}
                  className="w-full p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  required
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
            
            {/* Delete button */}
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => removeCondition(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Show validation message only when needed */}
      {!isValid && alertConditions.length > 0 && (
        <div className="mt-3 p-3 bg-red-100 text-red-700 rounded border border-red-300">
          <div className="font-bold">Cannot Save Configuration</div>
          <div>Please ensure all required fields are filled and there are no duplicate conditions.</div>
        </div>
      )}
    </div>
  );
};

export default AlertConfigurationSection;