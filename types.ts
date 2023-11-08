import Stripe from "stripe";

export interface UserDetails{
    id : string;
    firstName : string;
    lastName : string;
    fullName ?: string;
    avatarUrl ?: string;
    billingAddress ?: Stripe.Address;
    paymentMethod ?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
};

export interface Product{
    id : string;
    active ?: boolean;
    name ?: string;
    description ?: string;
    image ?: string;
    metadata ?: Stripe.Metadata;
};

export interface Price {
    id : string;
    productId ?: string;
    active ?: boolean;
    description ?: string;
    unit_amount ?: number;
    currency ?: string;
    type ?: Stripe.Price.Type;
    interval ?: Stripe.Price.Recurring.Interval;
    interval_count ?: number;
    trial_period_days ?: number | null;
    metadata ?: Stripe.Metadata;
    products ?: Product;
};

export interface Subscription{
    id : string;
    user_id : string;
    status ?: Stripe.Subscription.Status;
    metadata ?: Stripe.Metadata;
    price_id ?: string;
    quantity ?: number;
    cancel_at_period_end ?: boolean;
    created : string;
    current_period_start : string;
    current_period_end : string;
    ended_at ?: string;
    cancel_at ?: string;
    canceeled_at ?: string;
    trial_start ?: string;
    trial_end ?: string;
    prices ?: Price;
};