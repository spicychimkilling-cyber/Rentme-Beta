import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, X, Check, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { categories, locations } from '../lib/mockData';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { motion } from "framer-motion";  
import { ID } from 'appwrite';
import { storage, databases, DATABASE_ID, COLLECTION_ITEMS_ID, BUCKET_IMAGES_ID } from '../lib/appwrite';

export function ListItem() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [features, setFeatures] = useState('');
  const [images, setImages] = useState<string[]>([]); 
  const [fileIds, setFileIds] = useState<string[]>([]); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Please login to list items</h2>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    toast.info('Uploading images...');
    setIsSubmitting(true);

    try {
      const uploadedUrls: string[] = [];
      const uploadedFileIds: string[] = [];

      for (let i = 0; i < files.length && images.length + uploadedUrls.length < 5; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image file`);
          continue;
        }

        // Validate file size (max 100MB)
        if (file.size > 100 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Maximum size is 100MB`);
          continue;
        }

        try {
          
          const res = await storage.createFile(BUCKET_IMAGES_ID, ID.unique(), file);
          const fileId = res.$id;
          uploadedFileIds.push(fileId);
          
          try {
            const viewUrl = storage.getFileView(BUCKET_IMAGES_ID, fileId) as string;
            uploadedUrls.push(viewUrl);
          } catch {
            uploadedUrls.push('');
          }
        } catch (storageError: any) {
          console.error('Storage upload error:', storageError);
          toast.error(`Upload failed: ${storageError.message || 'Please check Appwrite Storage permissions'}`);
          setIsSubmitting(false);
          return;
        }
      }

      if (uploadedUrls.length > 0) {
        setImages((prev) => [...prev, ...uploadedUrls].slice(0, 5));
        setFileIds((prev) => [...prev, ...uploadedFileIds].slice(0, 5));
        toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload images: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || !description || !category || !price || !location) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setIsSubmitting(true);

    try {
      toast.info('Publishing listing...');

    
      await databases.createDocument(DATABASE_ID, COLLECTION_ITEMS_ID, ID.unique(), {
        title,
        desc: description,
        category,
        price: parseFloat(price),
        location,
        fileIds: fileIds.join(','),
        images: fileIds.join(','),
        features: features.split('\n').map((f) => f.trim()).filter(Boolean).join(','),
        ownerId: user?.id,
        ownerName: user?.name,
      });

      toast.success('Item listed successfully!');
      navigate('/dashboard?tab=listings');
    } catch (error: any) {
      console.error('Error saving listing:', error);
      toast.error(`Failed to list item: ${error.message || 'Please check your connection'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Tell us about your item' },
    { number: 2, title: 'Photos', description: 'Upload images' },
    { number: 3, title: 'Pricing & Location', description: 'Set your price' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">List Your Item</h1>
          <p className="text-gray-600">Share your items with the community and earn</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep >= step.number
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <div className="text-center mt-2 hidden md:block">
                    <div className="text-sm">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm mb-2 block">
                    Item Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Professional DSLR Camera"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm mb-2 block">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm mb-2 block">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="Describe your item in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                  />
                </div>

                <div>
                  <label className="text-sm mb-2 block">
                    Features (one per line)
                  </label>
                  <Textarea
                    placeholder="e.g.&#10;Like new condition&#10;Includes accessories&#10;Well maintained"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button onClick={() => setCurrentStep(2)} className="w-full">
                  Next Step
                </Button>
              </motion.div>
            )}

            {/* Step 2: Photos */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm mb-2 block">
                    Photos <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload up to 5 photos. First photo will be the cover image.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
                        <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            Cover
                          </div>
                        )}
                      </div>
                    ))}

                    {images.length < 5 && (
                      <label className={`aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center transition-colors ${
                        isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-blue-600'
                      }`}>
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">
                          {isSubmitting ? 'Uploading...' : 'Upload Photo'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={isSubmitting}
                        />
                      </label>
                    )}
                  </div>

                  <p className="text-xs text-gray-500">
                    Accepted formats: JPG, PNG, WEBP (max 5MB per image)
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} className="flex-1">
                    Next Step
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Pricing & Location */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm mb-2 block">
                    Daily Rental Price (BTN) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">Nu.</span>
                    <Input
                      type="number"
                      placeholder="100"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="pl-12"
                      min="0"
                      step="10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="mb-2">Review Your Listing</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Title:</strong> {title || 'Not set'}</p>
                    <p><strong>Category:</strong> {category || 'Not set'}</p>
                    <p><strong>Price:</strong> Nu. {price || '0'}/day</p>
                    <p><strong>Location:</strong> {location || 'Not set'}</p>
                    <p><strong>Photos:</strong> {images.length} uploaded</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1" disabled={isSubmitting}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}